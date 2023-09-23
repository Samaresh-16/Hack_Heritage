package com.umeed.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.umeed.entities.Steps;
import com.umeed.payloads.StepsDto;
import com.umeed.repositories.StepsRepository;
import com.umeed.services.StepsServices;

@Service
public class StepsServicesImpl implements StepsServices {
	
	@Autowired
	private StepsRepository stepsRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	

	@Override
	public List<StepsDto> getAllSteps() {
		
		List<Steps> listSteps= this.stepsRepository.findAll();
		
		List<StepsDto> listStepsDto=listSteps.stream().map(e->(this.stepsToDto(e))).collect(Collectors.toList());
		return listStepsDto;
	}
	
	public StepsDto stepsToDto(Steps steps) {
		StepsDto stepsDto=this.modelMapper.map(steps, StepsDto.class);
		
		return stepsDto;
	}

}
