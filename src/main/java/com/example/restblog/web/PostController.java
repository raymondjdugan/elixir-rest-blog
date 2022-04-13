package com.example.restblog.web;

import com.example.restblog.data.Post;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/posts", headers = "Accept=application/json")
public class PostController {

    public List<Post> createList (){
        Post post1 = new Post((long) 1, "Hi", "Hello One");
        Post post2 = new Post((long)2, "Hiya", "Hello Two");
        Post post3 = new Post((long)3, "Hiya Hi", "Hello Three");
        return new ArrayList<>(Arrays.asList(post1, post2, post3));
    }

    @GetMapping
    private List<Post> getAll() {
        return createList();
    }

    @GetMapping("{id}")
    private Post getOne(@PathVariable long id) {
        List<Post> blogs = createList();
        for (Post blog: blogs) {
            if (blog.getId() == id) {
                return blog;
            }
        }
        return null;
    }

    @PostMapping
    private void createPost(@RequestBody Post newPost){
        System.out.println(newPost.toString());
    }

    @CrossOrigin
    @PutMapping("{id}")
    private void updatePost(@PathVariable long id, @RequestBody Post newPost){
        System.out.println(id);
        System.out.println(newPost);
    }


    @DeleteMapping("{id}")
    private void deletePost(@PathVariable long id){
        System.out.println(id);
    }
}

