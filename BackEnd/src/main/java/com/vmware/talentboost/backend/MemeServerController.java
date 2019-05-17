package com.vmware.talentboost.backend;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.FileAlreadyExistsException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import com.vmware.talentboost.backend.exceptions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.event.EventListener;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PreDestroy;

@AutoConfigureBefore()
@RestController
public class MemeServerController {
    @Value("${my.domain.title}")
    private String title;
    @Value("${domains.host.properties}")
    String domainsHost;
    private final MemeModel memeModel;
    @Autowired
    private ServerDatabase database;

    private int id = 0;

    @Autowired
    public MemeServerController(MemeModel memeModel) {
        this.memeModel = memeModel;
    }


    @GetMapping("/meme")
    public ResponseEntity<String> sendAllMemes() {
        try {
            return ResponseEntity.ok()
                    .body(Meme.JSONify(memeModel.getMemes()));
        } catch (NoMemesFoundException e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body("{}");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteMeme(
            @RequestParam(value="meme-title") String memeTitle
    ) {
        if (memeTitle.equals("")) {
            System.out.println("Empty meme for deletion title");
            return ResponseEntity.status(400).body("Empty meme for deletion title");
        }

        try {
            memeModel.deleteMeme(memeTitle);
        } catch (MemeDoesntExistException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (FileCouldntBeDeletedException e) {
            e.printStackTrace();
            return ResponseEntity.status(409).body(e.getMessage());
        }

        String body = memeTitle + " successfully deleted!";
        System.out.println("RIP meme");
        return ResponseEntity.ok().body(body);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createImage(
            @RequestParam("title") String title,
            @RequestParam("file") MultipartFile files
    ) {
        try {
            memeModel.createMeme(files, title);
        } catch (FileAlreadyExistsException exists) {
            return ResponseEntity.status(501)
                    .body("File name taken. The fix of this is to be implemented via a database");
        }  catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Couldnt create file");
        }
        return ResponseEntity.ok().body("File creation successful!");
    }

    @PutMapping("/edit")
    public ResponseEntity<String> updateMeme(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "id", required = false) String id,
            @RequestParam(value = "title", required = false) String newTitle
    ) {
        if (file == null) {
            try {
                renameMeme(id, newTitle);
            } catch (CannotRenameMemeException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("Cannot rename right now");
            }
        } else {
            try {
                replaceMeme(file, id, newTitle);
            } catch (FileAlreadyExistsException exists) {
                return ResponseEntity.status(501)
                        .body("New file name taken. The fix of this is to be implemented via a database");
            } catch (IOException | FileCouldntBeDeletedException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("Cannot edit right now");
            } catch (MemeDoesntExistException e) {
                return ResponseEntity.status(500).body("I can't find this meme");
            }
        }
        return ResponseEntity.ok().body("Successful edit");
    }

    private void renameMeme(String id, String newTitle) throws CannotRenameMemeException {
        memeModel.renameFile(id, newTitle);
    }

    private void replaceMeme(MultipartFile file, String id, String newTitle) throws IOException, MemeDoesntExistException, FileCouldntBeDeletedException {
        memeModel.createMeme(file, newTitle);
        System.out.println("Created meme");
        try {
            memeModel.deleteMeme(id);
        } catch (MemeDoesntExistException | FileCouldntBeDeletedException e) {
            System.out.println("oof, backpedalling");
            memeModel.deleteMeme(newTitle); // hopefully this reverses the changes, similar to a transaction
            throw e;
        }
        System.out.println("Alles klaar");
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
