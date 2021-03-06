package com.example.restblog.web;

import com.example.restblog.DTO.NewPostDTO;
import com.example.restblog.data.*;
import com.example.restblog.services.EmailService;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    void createPost(@RequestBody NewPostDTO newPostDTO, OAuth2Authentication loggedInUser){
        System.out.println(newPostDTO);
        User author = userRepository.findByEmail(loggedInUser.getName());
        List<Category> categoriesList = new ArrayList<>();
        for (String category : newPostDTO.getCategories()) {
            categoriesList.add(categoryRepsitory.findByName(category));
        }
        Post newPost = new Post();
        newPost.setTitle(newPostDTO.getTitle());
        newPost.setContent(newPostDTO.getContent());
        newPost.setAuthor(author);
        newPost.setCategories(categoriesList);
        postRepository.save(newPost);
//        emailService.perpareAndSend(post,"New Post Created", "You created a new post");
    }

    @PutMapping("{id}")
    void updatePost(@PathVariable long id, @RequestBody NewPostDTO newPostDTO) {
        Post postToUpdate = postRepository.getById(id);
        if (!newPostDTO.getTitle().isEmpty()) {
            postToUpdate.setTitle(newPostDTO.getTitle());
        }
        if (!newPostDTO.getContent().isEmpty()) {
            postToUpdate.setContent(newPostDTO.getContent());
        }
        if  (!newPostDTO.getCategories().isEmpty()) {
            List<Category> categoriesList = new ArrayList<>();
            for (String category : newPostDTO.getCategories()) {
                categoriesList.add(categoryRepsitory.findByName(category));
            }
            postToUpdate.setCategories(categoriesList);
        }
        postRepository.save(postToUpdate);
    }

    @DeleteMapping("{id}")
    void deletePost(@PathVariable long id, OAuth2Authentication auth){
        if (postRepository.getById(id).getAuthor().getEmail().equals(auth.getName())) {
            postRepository.deleteById(id);
        }
    }
}

