package com.umeed.services;

import java.util.List;

import com.umeed.entities.User;
import com.umeed.payloads.UserDto;

public interface UserServices {
	
	UserDto registerUser(UserDto userdto);
	void deleteUserById(Integer userId);
	UserDto updateUser(UserDto userDto, Integer userId);
	UserDto getUserById(Integer userId);
	List<UserDto> getAllUsers();

}
