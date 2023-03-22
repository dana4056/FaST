package a402.FaST.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "article")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String img_path;
    private String content;
    private LocalDateTime createTime;
    private int like_count;
    private int comment_count;
    private String let;
    private String lng;

    @OneToMany(mappedBy = "article", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
    private List<ArticleHasTag> tags = new ArrayList<>();

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;


}
