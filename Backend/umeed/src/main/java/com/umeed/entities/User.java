package com.umeed.entities;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="user_details")
@NoArgsConstructor
@Getter
@Setter
public class User implements UserDetails {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int userId;
	
	@Column(name="user_fullname", nullable=false,length = 100)
	private String userFullName;
	
	@Column(unique = true, nullable=false)
	private String userEmail;
	
	@Column(nullable=false)
	private String userPassword;
	
	@Column(nullable=true)
	private String userAbout;
	
	@Column(nullable=false)
	private String userGender;
	
	@OneToMany(mappedBy = "postUser", cascade = CascadeType.ALL)
	private List<Post> userPosts=new ArrayList<>();
	
	@OneToMany(mappedBy = "commentUser", cascade = CascadeType.ALL)
	private Set<Comment> comments=new HashSet<>();
	

	@Override
	public String getPassword() {
		
		return this.userPassword;
	}

	@Override
	public String getUsername() {
		
		return this.userEmail;
	}

	@Override
	public boolean isAccountNonExpired() {
		
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}

}
