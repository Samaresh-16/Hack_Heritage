package com.umeed.controllers;

import java.security.Principal;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.umeed.entities.User;
import com.umeed.exceptions.ApiException;
//import com.quogle.exceptions.ApiException;
import com.umeed.payloads.JwtAuthRequest;
import com.umeed.payloads.JwtAuthResponse;
import com.umeed.payloads.UserDto;
import com.umeed.repositories.UserRepository;
import com.umeed.security.JwtTokenHelper;
import com.umeed.services.UserServices;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
	
	@Autowired
	private JwtTokenHelper jwtTokenHelper;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserServices userServices;
	
	@Autowired
	private ModelMapper modelMapper;
	
	
	@PostMapping("/login")
	public ResponseEntity<JwtAuthResponse> createToken(@Valid @RequestBody JwtAuthRequest request ) throws Exception{
		
		this.authenticate(request.getUsername(), request.getPassword());
		
		
		UserDetails userDetails=this.userDetailsService.loadUserByUsername(request.getUsername());
		
		
		String token=this.jwtTokenHelper.generateToken(userDetails);
		
		JwtAuthResponse response=new JwtAuthResponse();
		response.setToken(token);
		response.setUserDto(this.modelMapper.map((User)userDetails, UserDto.class));
		response.setSuccess(true);
		response.setMessage("User logged in successfully");
		return new ResponseEntity<JwtAuthResponse>(response,HttpStatus.OK);
		
	}
	
	private void authenticate(String username, String password) {
		
		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken=new UsernamePasswordAuthenticationToken(username, password);
		
		try {
			this.authenticationManager.authenticate(usernamePasswordAuthenticationToken);
			
		} catch (BadCredentialsException e) {
			System.out.println("invalid credentials");
			throw new ApiException("Enter Valid username or password!!");
		}
	}
	
	@PostMapping("/register")
	
	public ResponseEntity<JwtAuthResponse> registerUser(@Valid @RequestBody UserDto userDto){
		
		UserDto registeredUser = this.userServices.registerUser(userDto);
		
		//login part
		UserDetails userDetails=this.userDetailsService.loadUserByUsername(userDto.getUserEmail());
		
		String token=this.jwtTokenHelper.generateToken(userDetails);
		
		JwtAuthResponse response=new JwtAuthResponse();
		response.setUserDto(registeredUser);
		response.setSuccess(true);
		response.setMessage("User Registered successfully");
		response.setToken(token);
		return new ResponseEntity<JwtAuthResponse>(response,HttpStatus.CREATED);
	}
	
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/current_user")
	public ResponseEntity<UserDto> getUser(Principal principal){
		User user=this.userRepository.findByUserEmail(principal.getName()).get();
		UserDto userDto=this.modelMapper.map(user, UserDto.class);
		return new ResponseEntity<UserDto>(userDto,HttpStatus.OK);
	}
	
	
	
	
	
	

}
