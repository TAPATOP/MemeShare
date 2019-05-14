package com.vmware.talentboost.backend;

import com.vmware.talentboost.backend.exceptions.NoMemesFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

@Service
public class MemeModel {
    private Map<String, Meme> memes;
    private String memesSource;

    @Autowired
    MemeModel(@Value("${my.memes.location}") String memeLocation) {
        memes = new HashMap<>();
        memesSource = memeLocation;
        loadMemes();
    }

    private void loadMemes() {
        File folder = new File(memesSource);
        File[] files = folder.listFiles();
        if (files == null) {
            System.out.println("Warning: No memes found");
            return;
        }

        for (File file : files) {
            if (file.isFile()) {
                String url = file.getAbsolutePath();
                url = url.replace('\\', '/');
                String memeTitle = removeFileExtension(file.getName());
                memes.put(memeTitle, new Meme(memeTitle, url));
                System.out.println(url);
            }
        }
    }

    public Meme[] getMemes() throws NoMemesFoundException {
        if(memes.isEmpty()) {
            throw new NoMemesFoundException("No memes, mate");
        }
        return memes.values().toArray(new Meme[0]);
    }

    public Meme getMeme(String memeName) {
        return memes.get(memeName);
    }

    private String removeFileExtension(String fileName) {
        return fileName.substring(0, fileName.lastIndexOf('.'));
    }
}
