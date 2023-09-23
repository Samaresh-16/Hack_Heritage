package com.umeed.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.umeed.entities.Questions;
import com.umeed.payloads.QuestionsDto;
import com.umeed.repositories.QuestionsRepository;
import com.umeed.services.QuestionsServices;

@Service
public class QuestionsServicesImpl implements QuestionsServices {
	
	@Autowired
	private QuestionsRepository questionsRepository;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public List<QuestionsDto> getAllQuestions() {
		
		List<Questions> listQuestions = this.questionsRepository.findAll();
		
		List<QuestionsDto> listQuestionsDto=listQuestions.stream().map(e->(this.questionsToDto(e))).collect(Collectors.toList());
		return listQuestionsDto;
	}
	
	private QuestionsDto questionsToDto(Questions questions) {
		QuestionsDto questionsDto=this.modelMapper.map(questions, QuestionsDto.class);
		return questionsDto;
	}

}
