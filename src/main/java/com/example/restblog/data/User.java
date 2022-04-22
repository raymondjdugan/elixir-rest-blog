package com.example.restblog.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
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

    @NotNull
    @Email
    @NotEmpty
    private String email;

    @NotNull
    @ToString.Exclude
//    @JsonIgnore
    private String password;

    @Column
    private LocalDate createdAt;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("author")
    @Transient
    private Collection<Post> posts;
}
