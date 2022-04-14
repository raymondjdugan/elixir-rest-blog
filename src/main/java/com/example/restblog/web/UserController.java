package com.example.restblog.web;

import com.example.restblog.data.User;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/users", headers = "Accept=application/json")
public class UserController {

    private List<User> createUserList() {
        User one = new User(1, "rd", "rd@gmail.com","123",new Date(), User.Role.ADMIN);
        User two = new User(2, "wb", "wb@gmail.com","321",new Date(), User.Role.USER);
        User three = new User(3, "eb", "eb@gmail.com","213",new Date(), User.Role.USER);
        return new ArrayList<>(Arrays.asList(one, two, three));
    }

    @GetMapping
    List<User> getAll() {
        return createUserList();
    }

    @GetMapping("{id}")
    User getSingleUser(@PathVariable long id){
        List<User> users = createUserList();
        for (User user : users) {
            if (user.getId() == id) {
                return user;
            }
        }
        return null;
    }

    @PostMapping
    void createUser(@RequestBody User newUser) {
        System.out.println(newUser.toString());
    }

    @PutMapping("{id}")
    void updateUser(@PathVariable long id, @RequestBody User updateUser) {
        System.out.println(id);
        System.out.println(updateUser.toString());
    }

    @DeleteMapping("{id}")
    void deleteUser(@PathVariable long id) {
        System.out.println(id);
    }


}
