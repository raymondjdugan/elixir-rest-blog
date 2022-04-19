package com.example.restblog.web;

import com.example.restblog.data.Category;
import com.example.restblog.data.CategoryRepsitory;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/categories", headers = "Accept=application/json")
public class CategoriesController {
    public final CategoryRepsitory categoryRepsitory;

    public CategoriesController(CategoryRepsitory categoryRepsitory) {
        this.categoryRepsitory = categoryRepsitory;
    }

    @GetMapping
    Category getPostsByCategory(@RequestParam String categoryName) {
        return categoryRepsitory.findByName(categoryName);
    }
}
