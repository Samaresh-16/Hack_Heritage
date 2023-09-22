package com.umeed.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.umeed.entities.User;
import com.umeed.payloads.ApiResponse;
import com.umeed.payloads.UserDto;
import com.umeed.services.UserServices;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/apis/users")
public class UserController {
	
	@Autowired
	UserServices userServices;
	
	
//	@PostMapping("/")
//	public ResponseEntity<UserDto> addUser(@Valid @RequestBody User user){
//		UserDto returnedUserDto = this.userServices.addUser(user);
//		return new ResponseEntity<>(returnedUserDto,HttpStatus.CREATED);
//	}
	
	@GetMapping("/")
	public ResponseEntity<List<UserDto>> getAllUsers(){
		
		List<UserDto> allUsersList = this.userServices.getAllUsers();
		
		if(allUsersList.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		
		return ResponseEntity.of(Optional.of(allUsersList));
	}
	
	@GetMapping("/{userId}")
	
	public ResponseEntity<UserDto> getUserById(@PathVariable("userId") int userId){
		
		return ResponseEntity.ok(this.userServices.getUserById(userId));
		
	}
	
	@PutMapping("/{userId}")
	public ResponseEntity<ApiResponse> updateUser(@Valid @RequestBody UserDto userDto,@PathVariable("userId") int userId ){
		
			this.userServices.updateUser(userDto, userId);
		
		
			return new ResponseEntity<>(new ApiResponse("User updated successfully", true),HttpStatus.ACCEPTED);
	}
	
	
	@DeleteMapping("/{userId}")
	//@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponse> deleteUserById(@PathVariable int userId){
		
			this.userServices.deleteUserById(userId);
		
		
		return new ResponseEntity<>(new ApiResponse("User deleted successfully", true),HttpStatus.ACCEPTED);
	}

}
