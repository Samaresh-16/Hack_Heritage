package com.umeed.entities;


import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="posts")
@Getter
@Setter
@NoArgsConstructor
public class Post {
	
	@Id
	@Column(name="post_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer postId;
	
	@Column(name="post_content", length=10000)
	private String postContent;
	
	@Column(name="is_anoynomous", nullable = false)
	private String isAnoynomous;
	
	@Column(name="posts_date")
	private Date postAddingDate;
	
	@Column(name="like_count")
	private Integer postLikeCount;
	
//	@OneToMany(mappedBy = "likePost", cascade= CascadeType.ALL)
//	private List<Like> likes=new ArrayList<>();
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User postUser;

	@OneToMany(mappedBy = "commentPost", cascade = CascadeType.ALL)
	private Set<Comment> comments=new HashSet<>();
}
