package com.umeed.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.umeed.entities.Comment;
import com.umeed.entities.Post;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

		List<Comment> findBycommentPost(Post post);
}
