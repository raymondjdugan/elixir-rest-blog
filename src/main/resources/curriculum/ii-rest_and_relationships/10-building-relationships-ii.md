# Building Relationships, Pt II

Now that we've bound Users and Posts together, let's think about using object relationships to add functionality to our
application.

---

## Categories

In many blogging sites, you will see a post with an accompanying set of hashtags (or something similar).

This is indicating from under which categories a blog post can be found.

Implementing this functionality is actually very simple!

### The `Category`

We need to create an object to help us with categorizing posts.

Its job is to provide the names of which categories *exist*.

1. In the `data` package, create the `Category` class.


2. Let's give it only two private fields:
    - long id
    - String name


3. As usual, we need to create our POJO components for this class.

---

## Posts and Categories

It's time to bind our `Post` and `Category` objects together, but first we need to think about the relationship between
the two.

Unlike Users and Posts, this is going to need to be a ***many-to-many*** relationship:

- One `Category` can be related to many Posts.
    - The `javascript` category could have hundreds of posts associated.
    

- One `Post` could have many Categories
    - A single post can be filed under `javascript, DOM, and web design`
    

Thinking about this and how we implemented the Users-Posts relationship, try to add the needed fields to `Post` and `Category`

***Keep in mind that the relationship is slightly different!***

---

## The `CategoriesController`

Now that we have this relationship established, let's expose endpoints to provide the functionality to our client.

1. In the `web` package, create a `CategoriesController`
    - This REST Controller will accept `application/json` and listen on `/api/posts/categories`


2. In `CategoriesController`, add a new method: `getByCategory()`


3. `getPostsByCategory()` will return a list of `Post` objects with `@GetMapping` to designate the request method.


4. It will accept a parameter: `@RequestParameter String categoryName`

    
5. Much how we have done this previously, let's just create hard-coded objects to return.
    - You'll want to create a `Category` object and nest a few `Post` objects within the `posts` field.
    
---

## Next Up: [Data Access - now with Spring!](../iii-data_persistence/11-data-persistence.md)

