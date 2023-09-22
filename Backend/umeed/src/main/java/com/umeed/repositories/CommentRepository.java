package com.umeed.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.umeed.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}
