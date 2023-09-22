package com.umeed.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class JwtAuthRequest {
	
	@Email(message="Enter Valid Email Id")
	@NotEmpty(message="The Email must not be empty")
	private String username;
	@NotEmpty(message="The password must not be empty")
	private String password;

}
