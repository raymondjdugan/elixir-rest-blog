package com.example.restblog.web;

import com.example.restblog.data.User;
import com.example.restblog.data.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
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

    @GetMapping("currentUser")
    User getCurrentUser(OAuth2Authentication auth) {
        return userRepository.findByEmail(auth.getName());
    }

    @PostMapping("create")
    @PreAuthorize("!hasAuthority('USER') && !hasAuthority('ADMIN')")
    void createUser(@RequestBody User newUser) {
        System.out.println(newUser.toString());
        newUser.setRole(User.Role.USER);
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        userRepository.save(newUser);
    }

    @PutMapping("{id}")
    void updateUser(@PathVariable long id, @RequestBody User updateUser) {
        System.out.println(updateUser);
        User currentUser = userRepository.getById(id);
        currentUser.setUsername(updateUser.getUsername());
        currentUser.setEmail(updateUser.getEmail());
        currentUser.setRole(updateUser.getRole());
        userRepository.save(currentUser);
    }

    @PutMapping("{id}/updatePassword")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN') || (#currentPassword != null && !#currentPassword.isEmpty())")
    void updatePassword(@PathVariable Long id, @RequestParam String currentPassword,@Valid @Size(min = 3) @RequestParam String newPassword
    ) {
        if (!currentPassword.equals(newPassword)) {
            User currentUser = userRepository.getById(id);
            currentUser.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(currentUser);
        }
    }

    @DeleteMapping("{id}")
    void deleteUser(@PathVariable long id) {
        userRepository.deleteById(id);
    }
}
