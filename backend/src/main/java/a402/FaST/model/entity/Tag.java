package a402.FaST.model.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tag")
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(mappedBy = "tag", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
    private List<TagHasUser> users = new ArrayList<>();

    @OneToMany(mappedBy = "tag", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
    private List<ArticleHasTag> articles = new ArrayList<>();
}
