# 📚 Quiz App

A full-stack Quiz Application built using:

- **Frontend**: HTML, CSS, JavaScript with React
- **Backend**: Java with Spring Boot
- **Database**: MySQL

---

## 📦 Project Structure

QuizApp/
├── Frontend/                     # React-based frontend
├── QuizeBackend/                # Spring Boot backend
│   └── src/
│       └── main/
│           └── java/
│               └── com/PassFamilyDoddmane/QuizeBackend/
│                   └── QuizeBackendApplication.java

🚀 How to Run the Project:

1️⃣ Backend Setup (Spring Boot)

Step 1: Make sure MySQL is installed and running

Step 2: Create the database manually.
CREATE DATABASE quizdb;
USE quizdb;

Step 3: Set your MySQL credentials in:
QuizeBackend/src/main/resources/application.properties
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://localhost:3306/quizdb?createDatabaseIfNotExist=true

Step 4: Run the backend:
QuizeBackendApplication.java
Visit: http://localhost:8080/

2️⃣ Frontend Setup (React):

cd Frontend,
npm install,
npm start

📬 API Endpoints & Testing (Using Postman):

🔹 1. Get All Questions:
Method: GET,
URL: http://localhost:8080/api/questions/all ,
Expected: [] or list of question objects

🔹 2. Add a Question
Method: POST
URL: http://localhost:8080/api/questions/add
Headers: Content-Type: application/json
Body (raw JSON):
{
  "questionText": "What is 2 + 2?",
  "option1": "3",
  "option2": "4",
  "option3": "5",
  "option4": "6",
  "correctOption": 2,
  "explanation": "2 + 2 equals 4. Option 2 is the correct answer.",
  "type": "BASICS",
  "questionImageUrl": null,
  "explanationImageUrl": null
}


🔹 3. Get Questions by Type:
Method: GET
URL:
http://localhost:8080/api/questions/type/BASICS
or GENERAL, TECHNICAL

🔹  4. Delete a Question:
Method: DELETE
URL:
http://localhost:8080/api/questions/delete/{id}

🔹 5. User Login/Register:
Method: POST
URL: http://localhost:8080/api/users/login
Body Type: x-www-form-urlencoded
Key: phoneNumber
Value: +910123456789

🔹 6. Get User by Phone Number:
Method: GET
URL: http://localhost:8080/api/users/get
Params:
phoneNumber = +910123456789

🔹 7. Submit an Answer:
Method: POST
URL: http://localhost:8080/api/users/submit-answer
Headers: Content-Type: application/json
Body (raw JSON):
{
  "phoneNumber": "+919876543210",
  "questionId": 1,
  "selectedOption": 2
}

Expected Response:
{
  "success": true,
  "isCorrect": true,
  "explanation": "2 + 2 equals 4. Option 2 is the correct answer."
}

⚠️ Troubleshooting Tips:

| Issue                         | Solution                                                                          |
| ----------------------------- | --------------------------------------------------------------------------------- |
| ❌ `Connection refused`        | Make sure the Spring Boot backend is running and port is correct                  |
| ❌ `404 Not Found`             | Check if the API path is correct                                                  |
| ❌ `400 Bad Request`           | Check if the JSON body or parameters are valid                                    |
| ❌ `500 Internal Server Error` | Check backend logs for exceptions (e.g., DB not connected)                        |
| ❌ `MySQL errors`              | Make sure `quizdb` exists and credentials are correct in `application.properties` |

💾 Sample SQL Insert :
If you want to manually insert sample questions:

->INSERT INTO questions (question_text, option1, option2, option3, option4, correct_option, explanation, type, question_image_url, explanation_image_url)
->VALUES ('What color do you get when you mix red and blue?', 'Green', 'Purple', 'Orange', 'Brown', 2, 'Mixing red and blue creates purple.', 'BASICS', NULL, NULL);














