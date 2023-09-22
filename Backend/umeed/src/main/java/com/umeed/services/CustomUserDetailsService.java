package com.umeed.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.umeed.entities.User;
import com.umeed.exceptions.ApiException;
import com.umeed.exceptions.ResourceNotFoundException;
import com.umeed.repositories.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
		
		User user = this.userRepository.findByUserEmail(userEmail).orElseThrow(()->new ApiException("Invalid Username or password"));
		
		return user;
	}

}
