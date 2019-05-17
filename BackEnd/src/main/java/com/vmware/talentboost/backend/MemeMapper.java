package com.vmware.talentboost.backend;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.Nullable;

import java.sql.ResultSet;
import java.sql.SQLException;

public class MemeMapper implements RowMapper<Meme> {
    @Nullable
    @Override
    public Meme mapRow(ResultSet resultSet, int i) throws SQLException {
        return new Meme(
                resultSet.getString("title"),
                resultSet.getString("public_url"),
                resultSet.getString("absolute_path")
        );
    }
}
