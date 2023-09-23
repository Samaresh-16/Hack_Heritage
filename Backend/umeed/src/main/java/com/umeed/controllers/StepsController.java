package com.umeed.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.umeed.payloads.StepsDto;
import com.umeed.services.StepsServices;

@RestController
@RequestMapping("/apis")
public class StepsController {
		
		@Autowired
		StepsServices stepsServices;
		
		@GetMapping("/steps")
		public ResponseEntity<List<StepsDto>> getAllSteps(){
			List<StepsDto> allStepsList=this.stepsServices.getAllSteps();
			
			if(allStepsList.isEmpty()) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			}
			return ResponseEntity.of(Optional.of(allStepsList));
		}
		
}
