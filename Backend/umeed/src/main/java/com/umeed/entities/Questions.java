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
@Table(name="questions")
@Getter
@Setter
@NoArgsConstructor
public class Questions {
	
	@Id
	@Column(name="question_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer questionId;
	
	private String question;
	
	private String option1;
	
	private String option2;
	
	private String option3;
	
	private String option4;

}
