package com.umeed.payloads;

import lombok.Data;

@Data
public class JwtAuthResponse {

	private String token;
	
	private UserDto userDto;
	
	private boolean success;
	
	private String message;
}
