package com.umeed.payloads;


import java.util.Date;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CommentDto {
	
	private int commentId;
	
	//private PostDto commentPost;
	
	private String commentContent;
	
	private Date commentDate;
	
	//private UserDto commentUser;
	
	
}
