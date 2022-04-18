package com.example.restblog.web;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/categories", headers = "Accept=application/json")
public class CategoriesController {

//    @GetMapping
//    Category getPostsByCategory(@RequestParam String categoryName) {
//
//    }
}
