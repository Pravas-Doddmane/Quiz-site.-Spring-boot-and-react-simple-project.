package com.PassFamilyDoddmane.QuizeBackend.service;

import com.PassFamilyDoddmane.QuizeBackend.model.Question;
import com.PassFamilyDoddmane.QuizeBackend.model.QuestionType;
import com.PassFamilyDoddmane.QuizeBackend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    // Get all questions
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    // Add a new question
    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }

    // Delete a question by ID
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    // Check if the answer is correct
    public boolean isCorrectAnswer(Long questionId, int selectedOption) {
        Optional<Question> q = questionRepository.findById(questionId);
        return q.map(question -> question.getCorrectOption() == selectedOption).orElse(false);
    }

    // Get explanation for a question
    public String getExplanation(Long questionId) {
        Optional<Question> q = questionRepository.findById(questionId);
        return q.map(Question::getExplanation).orElse("Explanation not found.");
    }

    // Get questions by type
    public List<Question> getQuestionsByType(String type) {
        try {
            QuestionType questionType = QuestionType.valueOf(type.toUpperCase());
            return questionRepository.findByType(questionType);
        } catch (IllegalArgumentException e) {
            // Handle invalid question type, perhaps return an empty list or throw a custom exception
            return List.of();
        }
    }
}