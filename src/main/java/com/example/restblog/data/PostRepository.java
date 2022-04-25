package com.example.restblog.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByCategories(Category category);

    List<Post> findAllByAuthor(User author);
}
