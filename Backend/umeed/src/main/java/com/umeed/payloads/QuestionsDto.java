package com.umeed.payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QuestionsDto {
	
	private Integer questionId;
	 
	private String question;
	
	private String option1;
	
	private String option2;
	
	private String option3;
	
	private String option4;

}
