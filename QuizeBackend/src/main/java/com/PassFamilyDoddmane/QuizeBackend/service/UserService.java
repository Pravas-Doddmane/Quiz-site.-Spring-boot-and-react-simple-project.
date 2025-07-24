package com.PassFamilyDoddmane.QuizeBackend.service;

import com.PassFamilyDoddmane.QuizeBackend.model.Question;
import com.PassFamilyDoddmane.QuizeBackend.model.User;
import com.PassFamilyDoddmane.QuizeBackend.repository.QuestionRepository;
import com.PassFamilyDoddmane.QuizeBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public User loginOrRegister(String phoneNumber) {
        // Corrected: Use userRepository instance to call findByPhoneNumber
        Optional<User> userOptional = userRepository.findByPhoneNumber(phoneNumber);
        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            User newUser = new User();
            newUser.setPhoneNumber(phoneNumber);
            // Initialize points, totalQuestions, correctAnswers, wrongAnswers for new user
            newUser.setPoints(0);
            newUser.setTotalQuestions(0);
            newUser.setCorrectAnswers(0);
            newUser.setWrongAnswers(0);
            return userRepository.save(newUser);
        }
    }

    public User getUserByPhoneNumber(String phoneNumber) {
        // Corrected: Use userRepository instance to call findByPhoneNumber
        return userRepository.findByPhoneNumber(phoneNumber).orElse(null);
    }

    public boolean submitAnswer(String phoneNumber, Long questionId, int selectedOption) {
        // Corrected: Use userRepository instance to call findByPhoneNumber
        User user = userRepository.findByPhoneNumber(phoneNumber).orElse(null);
        if (user == null) return false;

        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        if (optionalQuestion.isEmpty()) return false;

        Question question = optionalQuestion.get();
        user.setTotalQuestions(user.getTotalQuestions() + 1);

        if (question.getCorrectOption() == selectedOption) {
            user.setCorrectAnswers(user.getCorrectAnswers() + 1);
            user.setPoints(user.getPoints() + 10); // Example: Award 10 points for a correct answer
        } else {
            user.setWrongAnswers(user.getWrongAnswers() + 1);
            // Deduct points or not, based on your game logic
            // user.setPoints(user.getPoints() - 5); // Example: Deduct 5 points for a wrong answer
        }

        userRepository.save(user);
        return true;
    }
}