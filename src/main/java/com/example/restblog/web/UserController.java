package com.example.restblog.web;

import com.example.restblog.data.User;
import com.example.restblog.data.UserRepository;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/users", headers = "Accept=application/json")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    List<User> getAll() {
        return userRepository.findAll();
    }

    @GetMapping("{id}")
    User getSingleUser(@PathVariable long id) {
        return userRepository.getById(id);
    }

    @GetMapping("username")
    User getByUsername(@RequestParam String username) {
       return userRepository.findByUsername(username);
    }

    @GetMapping("email")
    User getByEmail(@RequestParam String email) {
        return userRepository.findByEmail(email);
    }

    @PostMapping
    void createUser(@RequestBody User newUser) {
        newUser.setCreatedAt(LocalDate.now());
        newUser.setRole(User.Role.USER);
        userRepository.save(newUser);
    }

    @PutMapping("{id}")
    void updateUser(@PathVariable long id, @RequestBody User updateUser) {
        System.out.println(id);
        System.out.println(updateUser.toString());
    }

    @PutMapping("{id}/updatePassword")
    void updatePassword(@PathVariable Long id, @RequestParam(required = false) String oldPassword,
                        @Valid @Size(min = 3) @RequestParam String newPassword
    ) {

    }

    @DeleteMapping("{id}")
    void deleteUser(@PathVariable long id) {
        userRepository.deleteById(id);
    }

}
