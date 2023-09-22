package com.umeed.services.impl;

import java.util.Date;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.umeed.entities.Comment;
import com.umeed.entities.Post;
import com.umeed.entities.User;
import com.umeed.exceptions.ResourceNotFoundException;
import com.umeed.payloads.CommentDto;
import com.umeed.repositories.CommentRepository;
import com.umeed.repositories.PostRepository;
import com.umeed.repositories.UserRepository;
import com.umeed.services.CommentService;

@Service
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	ModelMapper modelMapper;
	
	@Autowired
	CommentRepository commentRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PostRepository postRepository;

	@Override
	public CommentDto createComment(CommentDto commentDto, Integer userId, Integer postId) {
		
		Comment comment=this.modelMapper.map(commentDto, Comment.class);
		
		Post post=this.postRepository.findById(postId).orElseThrow(()->new ResourceNotFoundException("Post", "Id", postId));
		
		User user=this.userRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("User", "Id", userId));
		
		comment.setCommentDate(new Date());
		
		//comment.setEdited(false);
		
		comment.setCommentPost(post);
		
		comment.setCommentUser(user);
		
		Comment returnedComment = this.commentRepository.save(comment);
		
		return this.modelMapper.map(returnedComment, CommentDto.class);
	}

	@Override
	public void deleteComment(Integer commentId) {
		
		Comment comment=this.commentRepository.findById(commentId).orElseThrow(()->new ResourceNotFoundException("Comment", "Id", commentId));
		
		this.commentRepository.delete(comment);
		
	}

	@Override
	public CommentDto updateComment(CommentDto commentDto, Integer commentId) {
		
		Comment comment=this.commentRepository.findById(commentId).orElseThrow(()->new ResourceNotFoundException("Comment", "Id", commentId));
		
		comment.setCommentContent(commentDto.getCommentContent());
		
		//comment.setCommentDate(new Date());
		
		//comment.setEdited(true);
		
		Comment returnedComment=this.commentRepository.save(comment);
		
		return this.modelMapper.map(returnedComment, CommentDto.class);
		
	}

}
