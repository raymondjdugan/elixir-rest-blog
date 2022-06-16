package com.example.restblog.DTO;

import lombok.*;

import java.util.Collection;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

public class NewPostDTO {
    private String title;
    private String content;
    private Collection<String> categories;
}
