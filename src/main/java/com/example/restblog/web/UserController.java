package com.example.restblog.web;

import com.example.restblog.data.User;
import com.example.restblog.data.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/users", headers = "Accept=application/json")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    List<User> getAll() {
        return userRepository.findAll();
    }

    @GetMapping("{id}")
    Optional<User> getSingleUser(@PathVariable long id) {
        return userRepository.findById(id);
    }

    @GetMapping("username")
    User getByUsername(@RequestParam String username) {
       return userRepository.findByUsername(username);
    }

    @GetMapping("email")
    User getByEmail(@RequestParam String email) {
        return userRepository.findByEmail(email);
    }

    @PostMapping("/create")
    @PreAuthorize("!hasAuthority('USER') && !hasAuthority('ADMIN')")

    void createUser(@RequestBody User newUser) {
        System.out.println(newUser.toString());
        newUser.setRole(User.Role.USER);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        userRepository.save(newUser);
    }

    @PutMapping("{id}")
    void updateUser(@PathVariable long id, @RequestBody User updateUser) {
        System.out.println(id);
        System.out.println(updateUser.toString());
    }

    @PutMapping("{id}/updatePassword")
    @PreAuthorize("!hasAuthority('USER') || (#oldPassword != null && !#oldPassword.isEmpty())")
    void updatePassword(@PathVariable Long id, @RequestParam(required = false) String oldPassword,
                        @Valid @Size(min = 3) @RequestParam String newPassword
    ) {

    }

    @DeleteMapping("{id}")
    void deleteUser(@PathVariable long id) {
        userRepository.deleteById(id);
    }

}
