package com.umeed.payloads;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.validation.constraints.NotEmpty;

//import com.quogle.entities.Comment;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostDto {
	
	private Integer postId;
	
	private String postContent;
	
	@NotEmpty(message = "Please enter if you want to push anoynoymously")
	private String isAnoynomous;
	
	private Integer postLikeCount;
	
	private Date postAddingDate;
	
	private UserDto postUser;
	
	private Set<CommentDto> comments=new HashSet<>();
	
	
	

}
