package com.vmware.talentboost.backend;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

public class Meme {

    private String title;
    private String image;
    private String absolutePath;

    public Meme(String title, String image, String absolutePath) {
        this.title = title;
        this.image = image;
        this.absolutePath = absolutePath;
    }

    public String getTitle() {
        return title;
    }

    public String getImage() {
        return image;
    }

    public String getAbsolutePath() {
        return absolutePath;
    }

    public void rename(String publicPath, String absolutePath) {
        this.image = publicPath;
        this.absolutePath = absolutePath;
    }

    public static String JSONify(Meme[] memes) {
        ObjectMapper mapperObj = new ObjectMapper();
        String jsonStr = null;

        try {
            jsonStr = mapperObj.writeValueAsString(memes);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return jsonStr;
    }
}
