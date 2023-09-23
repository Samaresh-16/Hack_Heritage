package com.umeed.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="steps")
@Getter
@Setter
@NoArgsConstructor
public class Steps {
	
	@Id
	@Column(name="steps_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="steps_title")
	private String title;
	
	@Column(name="steps_max_score")
	private Integer maxScore;
	
	@Column(name="steps_min_score")
	private Integer minScore;
	
	@Column(name="steps_link")
	private String link;

}
