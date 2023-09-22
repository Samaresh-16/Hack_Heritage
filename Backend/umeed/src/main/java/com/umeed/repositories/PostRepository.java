package com.umeed.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

//import com.umeed.entities.Category;
import com.umeed.entities.Post;
import com.umeed.entities.User;

public interface PostRepository extends JpaRepository<Post, Integer>  {
	
	List<Post> findBypostUser(User user);
	//List<Post> findBypostCategory(Category category);
	
	//List<Post> findByPostTitleContaining(String title);

}
