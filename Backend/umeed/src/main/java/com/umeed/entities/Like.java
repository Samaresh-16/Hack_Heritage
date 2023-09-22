package com.umeed.entities;

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
@Table(name="likes")
public class Like {
	
		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private int likeId;
		
		@ManyToOne
		private User likeUser;
		
		@ManyToOne
		private Post likePost;
}
