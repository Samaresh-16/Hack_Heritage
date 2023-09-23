package com.umeed.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.umeed.entities.Questions;

public interface QuestionsRepository extends JpaRepository<Questions, Integer> {

}
