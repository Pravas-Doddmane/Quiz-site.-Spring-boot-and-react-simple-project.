package com.PassFamilyDoddmane.QuizeBackend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String questionText;

    private String option1;
    private String option2;
    private String option3;
    private String option4;

    private int correctOption;

    private String explanation;

    @Enumerated(EnumType.STRING)
    private QuestionType type;

    // Optional future feature (image URLs)
    private String questionImageUrl;
    private String explanationImageUrl;
}