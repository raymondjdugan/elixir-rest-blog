package com.example.restblog.web;

import com.example.restblog.data.Category;
import com.example.restblog.data.CategoryRepsitory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/categories", headers = "Accept=application/json")
public class CategoryController {
    public final CategoryRepsitory categoryRepsitory;

    public CategoryController(CategoryRepsitory categoryRepsitory) {
        this.categoryRepsitory = categoryRepsitory;
    }

    @GetMapping
    List<Category> getAll(){
        return categoryRepsitory.findAll();
    }
}
