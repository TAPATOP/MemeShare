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
import java.util.*;

@Service
public class MemeModel {
    private String memesSource;
    private String publicMemesRoot;
    private ServerDatabase database;

    @Autowired
    MemeModel(
            @Value("${my.memes.location}") String memeLocation,
            @Value("${meme.folder.public.root}") String publicRoot,
            ServerDatabase database
    ) {
        this.memesSource = memeLocation;
        this.publicMemesRoot = publicRoot;
        this.database = database;
    }

    private String generateMemePublicURL(String fileName) {
        return publicMemesRoot + '/' + fileName;
    }

    public Meme[] getMemes() throws NoMemesFoundException {
        List<Meme> memes = database.getAllMemes();
        if(memes.isEmpty()) {
            throw new NoMemesFoundException("No memes, mate");
        }
        return memes.toArray(new Meme[0]);
    }

    public Meme getMeme(int id) throws MemeDoesntExistException {
        Meme meme = database.getMeme(id);
        if(meme == null) {
            throw new MemeDoesntExistException("This meme doesn't exist");
        }
        return meme;
    }

    public void deleteMeme(int id) throws MemeDoesntExistException, FileCouldntBeDeletedException {
        Meme meme = getMeme(id);
        String fileRealURL = meme.getAbsolutePath();
        System.out.println(fileRealURL);
        File fileForDeletion = new File(fileRealURL);
        deleteFile(fileForDeletion);
        database.removeMeme(id);
    }

    public void deleteFile(File file) throws FileCouldntBeDeletedException {
        if (!file.delete()) {
            throw new FileCouldntBeDeletedException("Couldn't delete the file");
        }
    }

    public void createMeme(MultipartFile file, String title, String extension) throws IOException {
        File newFile = copyFileOntoServer(file, extension);
        String fileAbsolutePath = newFile.getAbsolutePath();
        String publicPathName = generateMemePublicURL(newFile.getName());
        database.insertMeme(title, publicPathName, fileAbsolutePath);
    }

    public File copyFileOntoServer(MultipartFile file, String extention) throws IOException {
        String randomName = createRandomFileName(extention);
        System.out.println("Trying to create a file here: " + randomName);

        File newFile = new File(memesSource + '\\' + randomName);
        System.out.println("this is file absolute:" + newFile.getAbsolutePath());
        Files.copy(
                file.getInputStream(),
                Paths.get(newFile.getAbsolutePath())
        );
        return newFile;
    }

    private String createRandomFileName(String extension) {
        String filename = "";
        long millis = System.currentTimeMillis();
        filename = Long.toString(millis);
        return filename + '.' + extension;
    }

    public void updateMeme(int memeID, String title, File file) {
        database.editMeme(
                memeID,
                title,
                generateMemePublicURL(file.getName()),
                file.getAbsolutePath()
        );
    }

    public void changeMemeTitle(int id, String newTitle) throws CannotRenameMemeException {
        database.renameMeme(id, newTitle);
    }
}
