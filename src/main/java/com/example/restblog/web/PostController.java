package com.example.restblog.web;

import com.example.restblog.data.Post;
import com.example.restblog.data.PostRepository;
import com.example.restblog.data.User;
import com.example.restblog.data.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/posts", headers = "Accept=application/json")
public class PostController {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostController(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
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
    void createPost(@RequestBody Post newPost, @RequestParam String username){
        User author = userRepository.findByUsername(username);
        Post post = new Post();
        post.setTitle(newPost.getTitle());
        post.setContent(newPost.getContent());
        post.setUser(author);
        postRepository.save(post);
    }

    @PutMapping("{id}")
    void updatePost(@PathVariable long id, @RequestBody Post newPost) {
        Post postToUpate = postRepository.getById(id);
        if (!newPost.getTitle().isEmpty()) {
            postToUpate.setTitle(newPost.getTitle());
        }
        if (!newPost.getContent().isEmpty()) {
            postToUpate.setContent(newPost.getContent());
        }
        postRepository.save(postToUpate);
    }

    @DeleteMapping("{id}")
    void deletePost(@PathVariable long id){
        postRepository.deleteById(id);
    }
}

