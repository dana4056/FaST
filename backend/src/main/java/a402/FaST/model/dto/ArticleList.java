package a402.FaST.model.dto;

import java.time.LocalDateTime;

public interface ArticleList {
    Integer getId();
    String getImg_path();
    LocalDateTime getCreate_Time();
    Integer getLike_Count();
}
