package com.PassFamilyDoddmane.QuizeBackend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data // Generates getters, setters, toString, equals, etc.
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private int points = 0; // Initialize points to 0

    private int totalQuestions = 0;
    private int correctAnswers = 0;
    private int wrongAnswers = 0;
}