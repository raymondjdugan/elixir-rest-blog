package com.example.restblog.web;

import com.example.restblog.data.Post;
import com.example.restblog.data.PostRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/posts", headers = "Accept=application/json")
public class PostController {

    private final PostRepository postRepository;

    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
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
    void createPost(@RequestBody Post newPost){
        postRepository.save(newPost);
    }

    @PutMapping("{id}")
    void updatePost(@PathVariable long id, @RequestBody Post newPost){
        System.out.println(id);
        System.out.println(newPost);
    }


    @DeleteMapping("{id}")
    void deletePost(@PathVariable long id){
        postRepository.deleteById(id);
    }
}

