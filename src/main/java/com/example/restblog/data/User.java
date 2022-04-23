package com.example.restblog.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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
@EntityListeners(AuditingEntityListener.class)
@Table(name = "users", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
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
    @CreatedDate
    private LocalDate createdAt;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonIgnoreProperties("author")
    @Transient
    private Collection<Post> posts;
}
