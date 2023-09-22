package com.umeed.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.umeed.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	Optional<User> findByUserEmail(String userEmail);

}
