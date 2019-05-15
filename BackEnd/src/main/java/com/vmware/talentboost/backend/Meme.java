package com.vmware.talentboost.backend;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

public class Meme {

    private final String title;
    private final String imageURL;
    private final String absolutePath;

    public Meme(String title, String imageURL, String absolutePath) {
        this.title = title;
        this.imageURL = imageURL;
        this.absolutePath = absolutePath;
    }

    public String getTitle() {
        return title;
    }

    public String getImageURL() {
        return imageURL;
    }

    public String getAbsolutePath() {
        return absolutePath;
    }

    public static String JSONify(Meme[] memes) {
        ObjectMapper mapperObj = new ObjectMapper();
        String jsonStr = null;

        try {
            // get Employee object as a json string
            jsonStr = mapperObj.writeValueAsString(memes);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return jsonStr;
    }
}
