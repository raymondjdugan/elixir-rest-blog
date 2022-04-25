package com.example.restblog.web;

import com.example.restblog.data.*;
import com.example.restblog.services.EmailService;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/posts", headers = "Accept=application/json")
public class PostController {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CategoryRepsitory categoryRepsitory;
    private final EmailService emailService;

    public PostController(EmailService emailService, PostRepository postRepository, UserRepository userRepository, CategoryRepsitory categoryRepsitory) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.categoryRepsitory = categoryRepsitory;
        this.emailService = emailService;
    }

    @GetMapping
    List<Post> getAll() {
        return postRepository.findAll();
    }

    @GetMapping("{id}")
    Optional<Post> getOne(@PathVariable long id) {
        return postRepository.findById(id);
    }

    @GetMapping("searchByCategory")
    List<Post> searchByCategory(@RequestParam String category) {
        return postRepository.findAllByCategories(categoryRepsitory.findByName(category));
    }

    @GetMapping("getByUser")
    List<Post> searchByUser(OAuth2Authentication auth) {
        return postRepository.findAllByAuthor(userRepository.findByEmail(auth.getName()));
    }

    @PostMapping
    void createPost(@RequestBody Post newPost, @RequestParam String[] categories, OAuth2Authentication auth){
        String email = auth.getName();
        User author = userRepository.findByEmail(email);
        System.out.println(Arrays.toString(categories));
        List<Category> categoriesList = new ArrayList<>();
        for (String category : categories) {
            categoriesList.add(categoryRepsitory.findByName(category));
        }
        Post post = new Post();
        post.setTitle(newPost.getTitle());
        post.setContent(newPost.getContent());
        post.setAuthor(author);
        post.setCategories(categoriesList);
        postRepository.save(post);
        emailService.perpareAndSend(post,"New Post Created", "You created a new post");
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
    void deletePost(@PathVariable long id, OAuth2Authentication auth){
        if (postRepository.getById(id).getAuthor().getEmail().equals(auth.getName())) {
            postRepository.deleteById(id);
        }
    }
}

