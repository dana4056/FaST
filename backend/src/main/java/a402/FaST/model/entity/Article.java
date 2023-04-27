package a402.FaST.model.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "article")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(length = 500)
    private String imgPath;
    private String content;
    private LocalDateTime createTime;
    private String lat;
    private String lng;
    private String area;

    @OneToMany(mappedBy = "article", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
    private List<ArticleHasTag> tags = new ArrayList<>();

    @OneToMany(mappedBy = "article", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

   @OneToMany(mappedBy = "article", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
   private List<Likes> likes = new ArrayList<>();

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;


}
