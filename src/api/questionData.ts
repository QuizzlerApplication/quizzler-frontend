import { Question } from "@/models/quizzes";

// Define the base URL for your API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/* Add Question */
export async function addQuestion(quizId: string, questionData: Question) {
    const url = `${API_BASE_URL}/quizzes/question/${quizId}`;
    try {
      // Check for network errors before making the request
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      // Handle error
      if (error instanceof Error) {
        console.error("An error occurred while fetching quiz data:", error.message);
        throw error; // Rethrow the error to propagate it further if needed
      } else {
        console.error("An unknown error occurred:", error);
        throw new Error("An unknown error occurred");
      }
  }
}
  
/* Delete Question */
export async function deleteQuestion( questionId: string) {
  const url = `${API_BASE_URL}/quizzes/questions/${questionId}`;
  try {
    // Check for network errors before making the request
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }
  } catch (error) {
    // Handle error
    if (error instanceof Error) {
      console.error("An error occurred while deleting the question:", error.message);
      throw error; // Rethrow the error to propagate it further if needed
    } else {
      console.error("An unknown error occurred:", error);
      throw new Error("An unknown error occurred");
    }
  }
}

