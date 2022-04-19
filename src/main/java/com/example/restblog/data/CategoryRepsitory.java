package com.example.restblog.data;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepsitory extends JpaRepository<Category, Long> {
    Category findByName(String name);
}
