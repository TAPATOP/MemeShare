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
