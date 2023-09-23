package com.umeed.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.umeed.payloads.QuestionsDto;
import com.umeed.services.QuestionsServices;

@RestController
@RequestMapping("/apis")
public class QuestionsController {
	
	@Autowired
	QuestionsServices questionsServices;
	
	
	@GetMapping("/questions")
	public ResponseEntity<List<QuestionsDto>> getAllQuestions(){
		List<QuestionsDto> allQuestionsList=this.questionsServices.getAllQuestions();
		
		if(allQuestionsList.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		
		return ResponseEntity.of(Optional.of(allQuestionsList));
	}
	
	
}
