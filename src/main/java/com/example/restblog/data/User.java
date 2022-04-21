package com.example.restblog.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Collection;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "users")
public class User {
    public enum Role {USER, ADMIN};

    @Id
    @GeneratedValue
    private long id;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private LocalDate createdAt;
    @Column(nullable = false)
    private Role role;
    @OneToMany(mappedBy = "author")
    @JsonIgnoreProperties("author")
    private Collection<Post> posts;
}
