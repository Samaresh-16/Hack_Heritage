package com.umeed.entities;

import java.util.Date;

//import com.quogle.payloads.PostDto;
//import com.quogle.payloads.UserDto;

//import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="comments")
public class Comment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int commentId;
	
	private String commentContent;
	
	private Date commentDate;
	
	@ManyToOne
	private User commentUser;
	
	@ManyToOne
	private Post commentPost;

}
