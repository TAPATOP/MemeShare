package com.vmware.talentboost.backend;

import com.vmware.talentboost.backend.exceptions.CannotRenameMemeException;
import com.vmware.talentboost.backend.exceptions.FileCouldntBeDeletedException;
import com.vmware.talentboost.backend.exceptions.MemeDoesntExistException;
import com.vmware.talentboost.backend.exceptions.NoMemesFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class MemeModel {
    private Map<String, Meme> memes;
    private String memesSource;
    private ServerDatabase database;

    @Autowired
    MemeModel(
            @Value("${my.memes.location}") String memeLocation,
            ServerDatabase database
    ) {
        memes = new HashMap<>();
        memesSource = memeLocation;
        this.database = database;
        loadMemes();
    }

    private void loadMemes() {
        File folder = new File(memesSource);
        File[] files = folder.listFiles();
        if (files == null) {
            System.out.println("Warning: No memes found");
            return;
        }
        makeMemes(files);
    }

    private void makeMemes(File[] files) {
        for (File file : files) {
            if (file.isFile()) {
                String url = generateMemePublicURL(file.getName());
                String memeTitle = removeFileExtension(file.getName());
                Meme meme = new Meme(memeTitle, url, file.getAbsolutePath());
                memes.put(memeTitle, meme);
                /** enable this in case you're starting this for the first time and
                * already have images in your memes folder */
//                database.insertMeme(meme);
            }
        }
    }

    private String generateMemePublicURL(String fileName) {
        return "http://localhost:8080/memes/" + fileName;
    }

    public Meme[] getMemes() throws NoMemesFoundException {
        List<Meme> memes = database.getAllMemes();
        if(memes.isEmpty()) {
            throw new NoMemesFoundException("No memes, mate");
        }
        return memes.toArray(new Meme[0]);
    }

    public Meme getMeme(String memeName) throws MemeDoesntExistException {
        Meme meme = memes.get(memeName);
        if(meme == null) {
            throw new MemeDoesntExistException("This meme doesnt exist");
        }
        return meme;
    }

    public void deleteMeme(String id) throws MemeDoesntExistException, FileCouldntBeDeletedException {
        Meme meme = getMeme(id);
        String fileRealURL = meme.getAbsolutePath();
        System.out.println(fileRealURL);
        File fileForDeletion = new File(fileRealURL); // TODO: check if this is replaceable
        if(!fileForDeletion.delete()) {
            throw new FileCouldntBeDeletedException("Couldn't delete " + fileRealURL);
        }
        memes.remove(id);
    }

    public void createMeme(MultipartFile file, String title) throws IOException {
        String filePublicPath = memesSource + '\\' + title;
        File newFile = new File(filePublicPath);
        String fileAbsolutePath = newFile.getAbsolutePath();
        System.out.println("Creating here: " + fileAbsolutePath);
        Files.copy(
                file.getInputStream(),
                Paths.get(fileAbsolutePath)
        );
        memes.put(title, new Meme(title, filePublicPath, fileAbsolutePath));
    }

    private String removeFileExtension(String fileName) {
        return fileName.substring(0, fileName.lastIndexOf('.'));
    }

    public void renameFile(String identifier, String newName) throws CannotRenameMemeException {
        Meme memeForRenaming = memes.get(identifier);
        File fileForRenaming = new File(memeForRenaming.getAbsolutePath());
        String newFileNamePath = fileForRenaming.getParent() + '\\' + newName + getFileExtension(fileForRenaming.getName());
        if (!fileForRenaming.renameTo(new File(newFileNamePath))) {
            throw new CannotRenameMemeException("Cannot rename this file");
        }
        String filePublicPath = memesSource + '\\' + newName;
        memeForRenaming.rename(filePublicPath, newFileNamePath);
    }

    private String getFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf('.'), fileName.length());
    }
}
