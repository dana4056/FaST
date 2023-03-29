package a402.FaST.model.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "`user`")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String email;

    private String password;

    private String nickname;

    private String salt;

    @Column(length = 500)
    private String imgPath;

    private String provider;

    @ManyToMany
    @JoinTable(
            name = "user_authority",
            joinColumns = {@JoinColumn(name = "id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")})
    private Set<Authority> authorities;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
    private List<TagHasUser> tags = new ArrayList<>();

    @OneToMany(mappedBy = "fromId", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
    private List<Follow> fromId = new ArrayList<>();

    @OneToMany(mappedBy = "toId", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
    private List<Follow> toId = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
    private List<Article> articles = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

//    @OneToMany(mappedBy = "user", cascade = {CascadeType.REMOVE}, orphanRemoval = true)
//    private List<Like> likes = new ArrayList<>();


}
