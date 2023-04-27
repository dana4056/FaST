package a402.FaST.model.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "comment")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String content;
    private LocalDateTime createTime;  ;

    @OneToMany(mappedBy = "comment", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
    private List<Likes> likes = new ArrayList<>();
    @OneToMany(mappedBy = "comment", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
    private List<CommentReply> commentReplies = new ArrayList<>();
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(targetEntity = Article.class, fetch = FetchType.LAZY)
    @JoinColumn(name="article_id")
    private Article article;


}
