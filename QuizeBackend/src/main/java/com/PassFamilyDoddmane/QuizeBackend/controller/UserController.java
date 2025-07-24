package com.PassFamilyDoddmane.QuizeBackend.controller;

import com.PassFamilyDoddmane.QuizeBackend.model.AnswerRequest;
import com.PassFamilyDoddmane.QuizeBackend.model.User;
import com.PassFamilyDoddmane.QuizeBackend.service.QuestionService;
import com.PassFamilyDoddmane.QuizeBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Allow React or Android to call this API
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private QuestionService questionService;

    @PostMapping("/login")
    public User login(@RequestParam String phoneNumber) {
        return userService.loginOrRegister(phoneNumber);
    }

    @GetMapping("/get")
    public User getUser(@RequestParam String phoneNumber) {
        return userService.getUserByPhoneNumber(phoneNumber);
    }

    @PostMapping("/submit-answer")
    public Map<String, Object> submitAnswer(@RequestBody AnswerRequest request) {
        boolean updated = userService.submitAnswer(
                request.getPhoneNumber(),
                request.getQuestionId(),
                request.getSelectedOption()
        );

        boolean isCorrect = questionService.isCorrectAnswer(request.getQuestionId(), request.getSelectedOption());
        String explanation = questionService.getExplanation(request.getQuestionId());

        Map<String, Object> response = new HashMap<>();
        response.put("success", updated);
        response.put("isCorrect", isCorrect);
        response.put("explanation", explanation);
        return response;
    }
}