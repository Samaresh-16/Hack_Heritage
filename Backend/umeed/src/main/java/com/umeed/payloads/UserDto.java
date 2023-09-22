package com.umeed.payloads;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

//import java.util.HashSet;
//import java.util.Set;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@JsonIgnoreProperties(value="userPassword", allowSetters = true)
public class UserDto {
	
	public int userId;
	
	@NotEmpty(message="The name of the user must not be empty")
	@Size(min=4,message="The name of user must be of more than 4 characters")
	public String userFullName;
	
	@NotEmpty(message="The email must not be empty")
	@Email(message="Enter valid email")
	public String userEmail;
	
	@NotEmpty(message="The password must not be empty")
	@Size(min=5, message="The password of user must be of more than 5 characters")
	private String userPassword;
	
	public String userAbout;
	
	//private Set<CommentDto> comments=new HashSet<>();

}
