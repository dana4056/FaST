package a402.FaST.model.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "comment_reply")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentReply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String content;
    private LocalDateTime createTime;  ;

    @OneToMany(mappedBy = "commentReply", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
    private List<Likes> likes = new ArrayList<>();

    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(targetEntity = Comment.class, fetch = FetchType.LAZY)
    @JoinColumn(name="comment_id")
    private Comment comment;


}
