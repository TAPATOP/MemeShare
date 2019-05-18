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
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class MemeModel {
//    private Map<String, Meme> memes;
    private String memesSource;
    private ServerDatabase database;

    @Autowired
    MemeModel(
            @Value("${my.memes.location}") String memeLocation,
            ServerDatabase database
    ) {
//        memes = new HashMap<>();
        memesSource = memeLocation;
        this.database = database;
//        loadMemes();
    }

//    private void loadMemes() {
//        File folder = new File(memesSource);
//        File[] files = folder.listFiles();
//        if (files == null) {
//            System.out.println("Warning: No memes found");
//            return;
//        }
//        makeMemes(files);
//    }

//    private void makeMemes(File[] files) {
//        for (File file : files) {
//            if (file.isFile()) {
//                String url = generateMemePublicURL(file.getName());
//                String memeTitle = removeFileExtension(file.getName());
//                Meme meme = new Meme(memeTitle, url, file.getAbsolutePath());
//                memes.put(memeTitle, meme);
//                /** enable this in case you're starting this for the first time and
//                * already have images in your memes folder */
////                database.insertMeme(meme);
//            }
//        }
//    }

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
        File fileForDeletion = new File(fileRealURL); // TODO: check if this is replaceable
        if(!fileForDeletion.delete()) {
            throw new FileCouldntBeDeletedException("Couldn't delete " + fileRealURL);
        }
        database.removeMeme(id);
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
        database.insertMeme(title, filePublicPath, fileAbsolutePath);
    }

    // TODO: Extension instead of title
    public File createFile(MultipartFile file, String title) throws IOException {
        String filePublicPath = createRandomFileName(title);
        System.out.println("Trying to create a file here: " + filePublicPath);

        File newFile = new File(filePublicPath);
        Files.copy(
                file.getInputStream(),
                Paths.get(newFile.getAbsolutePath())
        );
        return newFile;
    }

    public void deleteFile(File file) throws FileCouldntBeDeletedException {
        if (!file.delete()) {
            throw new FileCouldntBeDeletedException("Couldn't delete the file");
        }
    }

    private String createRandomFileName(String title) {
        SimpleDateFormat date = new SimpleDateFormat("File-ddMMyy-hhmmss.SSS.txt");
        Random random = new Random();
        String randomName = String.format("%s.%s", date.format( new Date() ),
                random.nextInt(9));
        return memesSource + '\\' + randomName + getFileExtension(title);
    }

    private String removeFileExtension(String fileName) {
        return fileName.substring(0, fileName.lastIndexOf('.'));
    }

    public void changeMemeTitle(int id, String newTitle) throws CannotRenameMemeException {
        database.renameMeme(id, newTitle);
    }

//    public void changeMemeFile(int id, File file, String title) {
//        database.editMeme(id, title, memesSource + '\\' + generateMemePublicURL(file), file.getAbsolutePath());
//    }

    private String getFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf('.'), fileName.length());
    }
}
