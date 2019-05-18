package com.vmware.talentboost.backend;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ServerDatabase {

    @Autowired
    private JdbcTemplate jdbcTemplate;

//    public void test() {
//        String sql = "INSERT INTO records (title, public_url, absolute_path) values (?, ?, ?)";
//        jdbcTemplate.update(sql, "title69", "/overthere", "E:/nowhere/lel");
//        List<String> result = jdbcTemplate.queryForList(
//                "select title from records",
//                String.class
//        );
//        for(String rec : result) {
//            System.out.println(rec);
//        }
//    }

    public void insertMeme(String title, String publicUrl, String absolutePath) {
        String sql = "INSERT INTO records (title, public_url, absolute_path) values (?, ?, ?)";
        jdbcTemplate.update(sql, title, publicUrl, absolutePath);
        jdbcTemplate.queryForList(
                "select title from records",
                String.class
        );
    }

    public List<Meme> getAllMemes() {
        String query = "select * from records";
        return jdbcTemplate.query(
                query,
                new MemeMapper()
        );
    }

    public Meme getMeme(int id) {
        return jdbcTemplate.queryForObject(
                "select * from records where id like ?",
                new MemeMapper(),
                id);
    }

    public boolean removeMeme(int id) {
        Integer result = jdbcTemplate.update(
                "delete from records where id=?",
                id
        );
        return result > 0;
    }

    public boolean renameMeme(int id, String newTitle) {
        Integer result = jdbcTemplate.update(
                "update records set title=? where id=?",
                newTitle,
                id
        );
        return result > 0;
    }

    public boolean editMeme(int memeID, String title, String publicURL, String absolutePath) {
        Integer result = jdbcTemplate.update(
                "update records set title=?, public_url=?, absolute_path=? where id=?",
                title,
                publicURL,
                absolutePath,
                memeID
        );
        return result > 0;
    }

    public String getCapitalOf(String country) {
        return jdbcTemplate.queryForObject(
                "select capital from capitals where country like ?",
                String.class,
                country
        );
    }

    public List<String> getCountries() {
        return jdbcTemplate.queryForList("select country from capitals", String.class);
    }

//    public List<UserAccount> getAccounts() {
//        return jdbcTemplate.query(
//                "select name, role from users, roles where users.role_id=roles.id",
//                new UserAccountMapper()
//        );
//    }
}
