package com.vmware.talentboost.backend;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.FileAlreadyExistsException;
import java.util.HashMap;
import java.util.Map;

import com.vmware.talentboost.backend.exceptions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.context.event.ApplicationReadyEvent;
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
            @RequestParam(value="id") int id
    ) {
        try {
            memeModel.deleteMeme(id);
        } catch (MemeDoesntExistException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (FileCouldntBeDeletedException e) {
            e.printStackTrace();
            return ResponseEntity.status(409).body(e.getMessage());
        }

        String body = id + " successfully deleted!";
        System.out.println("RIP meme");
        return ResponseEntity.ok().body(body);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createImage(
            @RequestParam("title") String title,
            @RequestParam("extension") String extension,
            @RequestParam("file") MultipartFile files
    ) {
        try {
            memeModel.createMeme(files, title, extension);
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
            @RequestParam(value = "extension", required = false) String extension,
            @RequestParam(value = "id", required = false) int id,
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
                replaceMeme(file, id, newTitle, extension);
            } catch (IOException | FileCouldntBeDeletedException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("Cannot edit right now");
            } catch (MemeDoesntExistException e) {
                return ResponseEntity.status(500).body("I can't find this meme");
            }
        }
        return ResponseEntity.ok().body("Successful edit");
    }

    private void renameMeme(int id, String newTitle) throws CannotRenameMemeException {
        memeModel.changeMemeTitle(id, newTitle);
    }

    private void replaceMeme(MultipartFile file, int id, String newTitle, String extension) throws IOException, MemeDoesntExistException, FileCouldntBeDeletedException {
        assert(file != null);
        File newFile = memeModel.copyFileOntoServer(file, extension);
        System.out.println("Created meme");
        File fileForReplacement;
        try {
            fileForReplacement = new File(memeModel.getMeme(id).getAbsolutePath());
            memeModel.deleteFile(fileForReplacement);
        } catch (MemeDoesntExistException e) {
            memeModel.deleteFile(newFile); // hopefully this reverses the changes, similar to a transaction
            throw new MemeDoesntExistException("You cannot delete a meme that doesn't exist");
        } catch (FileCouldntBeDeletedException e) {
            memeModel.deleteFile(newFile); // hopefully this reverses the changes, similar to a transaction
            throw new FileCouldntBeDeletedException("I couldn't delete the old meme");
        }
        memeModel.updateMeme(id, newTitle, fileForReplacement);
    }

    @EventListener(ApplicationReadyEvent.class)
    public void register() throws CannotGetOwnIPException {
        try {
            for(Meme meme : memeModel.getMemes()) {
                System.out.println(meme.getId());
                System.out.println(meme.getTitle());
                System.out.println(meme.getImage());
                System.out.println(meme.getAbsolutePath());
                System.out.println("==================");
            }
        } catch (NoMemesFoundException e) {
            System.out.println("Oof");
        }
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
