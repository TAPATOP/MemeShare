package com.vmware.talentboost.backend;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import com.vmware.talentboost.backend.exceptions.CannotGetOwnIPException;
import com.vmware.talentboost.backend.exceptions.FileCouldntBeDeletedException;
import com.vmware.talentboost.backend.exceptions.MemeDoesntExistException;
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
    private final
    MemeModel memeModel;

    private int id = 0;

    @Autowired
    public MemeServerController(MemeModel memeModel) {
        this.memeModel = memeModel;
    }

    @GetMapping("/meme")
    public ResponseEntity<String> sendAllMemes() {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Allow-Origin", "*");

        System.out.println("SPURDO SPARDE");

        try {
            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .body(Meme.JSONify(memeModel.getMemes()));
        } catch (NoMemesFoundException e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(404).headers(responseHeaders).body("{}");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteMeme(
            @RequestParam(value="meme-title", defaultValue="") String memeTitle
    ) {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("Access-Control-Allow-Origin", "*");
        if (memeTitle.equals("")) {
            System.out.println("I didnt receive a parameter");
            return ResponseEntity.status(400)
                    .headers(responseHeaders)
                    .body("Empty meme for deletion title");
        }

        try {
            memeModel.deleteMeme(memeTitle);
        } catch (MemeDoesntExistException e) {
            System.out.println("This meme doesnt exist");
            return ResponseEntity.status(404)
                    .headers(responseHeaders)
                    .body(e.getMessage());
        } catch (FileCouldntBeDeletedException e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(409)
                    .headers(responseHeaders)
                    .body(e.getMessage());
        }

        String body = memeTitle + " successfully deleted!";
        System.out.println("RIP meme");
        return ResponseEntity.ok()
                .headers(responseHeaders)
                .body(body);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void register() throws CannotGetOwnIPException {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map= new LinkedMultiValueMap<>();
        map.add("name", "Deep Fried Memes");
        map.add("address", "http://" + findGlobalIP() + ":8080");
        System.out.println(map.toString());

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        ResponseEntity<String> response = restTemplate.postForEntity( domainsHost + "/domain/register", request , String.class );
        System.out.println(response.toString());
        if (response.getStatusCodeValue() == 200 && response.getBody() != null) {
            id = Integer.parseInt(response.getBody());
        }
    }

    @PreDestroy
    public void deregister() {
        RestTemplate restTemplate = new RestTemplate();

        String url = domainsHost + "/domain/deregister/" + id;
        Map<String, Integer> values = new HashMap<>(2);
        values.put("id", id);

        System.out.println(url);

        restTemplate.delete(
                url,
                values
        );
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

    @RequestMapping("/shutdown")
    void shutdown() {
        deregister();
    }
}
