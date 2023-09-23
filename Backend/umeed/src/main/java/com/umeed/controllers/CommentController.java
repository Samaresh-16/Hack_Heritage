package com.umeed.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.umeed.payloads.CommentDto;
import com.umeed.services.CommentService;

@RestController
@RequestMapping("/apis")
public class CommentController {
	
	@Autowired
	CommentService commentService;
	
	@PostMapping("/post/{postId}/user/{userId}/comment")
	public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto,@PathVariable("postId") Integer postId, @PathVariable("userId") Integer userId){
		
		CommentDto returnedCommentDto = this.commentService.createComment(commentDto, userId, postId);
		return new ResponseEntity<CommentDto>(returnedCommentDto,HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/comment/{commentId}")
	public ResponseEntity<String> deleteComment(@PathVariable("commentId") Integer commentId){
		this.commentService.deleteComment(commentId);
		return ResponseEntity.status(HttpStatus.OK).body("comment deleted successfully");
	}
	
	@PutMapping("/update/comment/{commentId}")
	public ResponseEntity<CommentDto> updateComment(@RequestBody CommentDto commentDto,@PathVariable("commentId") Integer commentId){
		CommentDto returnedCommentDto=this.commentService.updateComment(commentDto, commentId); 
		
		return new ResponseEntity<CommentDto>(returnedCommentDto,HttpStatus.OK);
	}
	
	@GetMapping("/comments/post_id/{postId}")
	public ResponseEntity<List<CommentDto>> getAllCommentsByPostId(@PathVariable("postId") Integer postId){
		List<CommentDto> comments=this.commentService.getAllCommentByPostId(postId);
		
		return new ResponseEntity<List<CommentDto>>(comments,HttpStatus.OK);
	}
}
