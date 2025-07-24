package com.PassFamilyDoddmane.QuizeBackend.model;

import lombok.Data;

@Data
public class AnswerRequest {
    private String phoneNumber;
    private Long questionId;
    private int selectedOption;
}