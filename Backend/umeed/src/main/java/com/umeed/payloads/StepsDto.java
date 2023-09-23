package com.umeed.payloads;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StepsDto {
	
	private Integer id;
	
	private String title;
	
	private Integer maxScore;
	
	private Integer minScore;
	
	private String link;

}
