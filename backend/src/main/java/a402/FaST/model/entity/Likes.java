package a402.FaST.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "likes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(targetEntity = Article.class, fetch = FetchType.LAZY)
    @JoinColumn(name="article_id")
    private Article article;

    @ManyToOne(targetEntity = Comment.class, fetch = FetchType.LAZY)
    @JoinColumn(name="comment_id")
    private Comment comment;


}
