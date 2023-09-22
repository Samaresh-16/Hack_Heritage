package com.umeed.services;

import java.util.List;

import com.umeed.payloads.PostDto;
import com.umeed.payloads.PostResponse;

public interface PostServices {
	
	
	//create
	PostDto creatingPost(PostDto postDto,Integer userId);
	
	//update
	PostDto updatingPost(PostDto postDto, Integer postId);
	
	//increase likes
	
	//delete
	void deletingPost(Integer postId);
	
	//getPostById
	PostDto getPostById(Integer postId);
	
	//getAllPosts
	PostResponse getAllPosts(Integer pageNumber, Integer pageSize, String sortBy, String sortDir);
	
	//getAllPostsByUser
	List<PostDto> getAllPostsByUser(Integer userId);
	
	
	

}
