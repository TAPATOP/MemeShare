package com.vmware.talentboost.backend;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import com.vmware.talentboost.backend.exceptions.CannotGetOwnIPException;
import com.vmware.talentboost.backend.exceptions.NoMemesFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PreDestroy;

@AutoConfigureBefore()
@RestController
public class MemeServerController {
    @Value("${my.domain.title}")
    private String title;
    @Value("${domains.host.properties}")
    String domainsHost;
    @Value("${my.memes.location}")
    private String memesURL;

    private int id = 2;

//    @Autowired
//    MemeServerController(String domainsHost) {
//        this.domainsHost = domainsHost;
//    }

    @RequestMapping("/greeting")
    public Meme greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return new Meme("some titl", "Some url");
    }

    @GetMapping("/itsko")
    public ResponseEntity<String> something(@RequestParam(value="name", defaultValue="fucker") String name) {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Allow-Origin", "*");

        return ResponseEntity.ok()
                .headers(responseHeaders)
                .body(new Meme("title", "itsko is the best " + name).toString());
    }

    @GetMapping("/meme")
    public ResponseEntity<String> sendAllMemes() {
        try {
            getAllMemes();
        } catch (NoMemesFoundException e) {
            e.printStackTrace();
        }

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Allow-Origin", "*");

        try {
            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body(Meme.JSONify(getAllMemes()));
        } catch (NoMemesFoundException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok().headers(responseHeaders).body("{}");
    }

    private Meme[] getAllMemes() throws NoMemesFoundException {
        File folder = new File(memesURL);
        File[] files = folder.listFiles();
        if (files == null) {
            throw new NoMemesFoundException("I couldn't find any memes mate");
        }

        Meme[] memes = new Meme[files.length];

        for (int i = 0; i < files.length; i++) {
            if (files[i].isFile()) {
                String url = files[i].getAbsolutePath();
                url = url.replace('\\','/');
                memes[i] = new Meme(removeFileExtention(files[i].getName()), url);
                System.out.println(files[i].getAbsolutePath());
            }
        }

        return memes;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void fun() {
        System.out.println(memesURL + " " + title + " " + domainsHost);
    }
    public int register() throws CannotGetOwnIPException {
        RestTemplate restTemplate = new RestTemplate();
        String request =
                "{" +
                        "\"name\":\"" + title +"\"," +
                        "\"address\":\"" + findGlobalIP() +"\"" +
                "}";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> getMap = new HashMap<>();
        getMap.put("name", title);
        getMap.put("address", findGlobalIP());

        HttpEntity<Map> entity = new HttpEntity<>(getMap, headers);
        ResponseEntity<String> response = restTemplate.postForEntity( domainsHost + "/domain/register", entity, String.class);

        System.out.println(response.toString());
        return response.getStatusCodeValue();
    }

//    @PreDestroy
    public int deregister() {
        RestTemplate restTemplate = new RestTemplate();
        String request = "{\"id\": " + id +"}";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(request, headers);
        ResponseEntity<String> response = restTemplate.postForEntity( domainsHost + "/domain/deregister", entity, String.class);

        System.out.println(response.toString());
        return response.getStatusCodeValue();
    }

    private String removeFileExtention(String fileName) {
        return fileName.substring(0, fileName.lastIndexOf('.'));
    }

    private String findGlobalIP() throws CannotGetOwnIPException {
        URL whatismyip;
        String ip;
        String helperSite = "http://checkip.amazonaws.com";
        try {
            whatismyip = new URL(helperSite);
        } catch (MalformedURLException e) {
            throw new CannotGetOwnIPException(helperSite + " is not responding");
        }
        try {
            BufferedReader in = new BufferedReader(new InputStreamReader(
                    whatismyip.openStream()));
            ip = in.readLine();
        } catch (IOException e) {
            throw new CannotGetOwnIPException("Couldn't open a buffered reader");
        }
        return ip;
    }
}
