package com.example.restblog.web;

import com.example.restblog.data.*;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/posts", headers = "Accept=application/json")
public class PostController {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CategoryRepsitory categoryRepsitory;

    public PostController(PostRepository postRepository, UserRepository userRepository, CategoryRepsitory categoryRepsitory) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.categoryRepsitory = categoryRepsitory;
    }

    @GetMapping
    List<Post> getAll() {
        return postRepository.findAll();
    }

    @GetMapping("{id}")
    Post getOne(@PathVariable long id) {
        return postRepository.getById(id);
    }

    @PostMapping
    void createPost(@RequestBody Post newPost, @RequestParam String username, @RequestParam String[] categories){
        User author = userRepository.findByUsername(username);
        System.out.println(categories);
        List<Category> categoriesList = new ArrayList<>();
        for (String category : categories) {
            categoriesList.add(categoryRepsitory.findByName(category));
        }
        Post post = new Post();
        post.setTitle(newPost.getTitle());
        post.setContent(newPost.getContent());
        post.setUser(author);
        post.setCategories(categoriesList);
        postRepository.save(post);
    }

    @PutMapping("{id}")
    void updatePost(@PathVariable long id, @RequestBody Post newPost, @RequestParam String[] categories) {
        Post postToUpate = postRepository.getById(id);
        if (!newPost.getTitle().isEmpty()) {
            postToUpate.setTitle(newPost.getTitle());
        }
        if (!newPost.getContent().isEmpty()) {
            postToUpate.setContent(newPost.getContent());
        }
        List<Category> categoriesList = new ArrayList<>();
        for (String category : categories) {
            categoriesList.add(categoryRepsitory.findByName(category));
        }
        postToUpate.setCategories(categoriesList);
        postRepository.save(postToUpate);
    }

    @DeleteMapping("{id}")
    void deletePost(@PathVariable long id){
        postRepository.deleteById(id);
    }
}

