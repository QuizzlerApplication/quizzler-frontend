// Define the base URL for your API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// fetch quiz data from the API
export async function fetchData(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch quiz data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        // Handle the error here
        if (error instanceof Error) {
            console.error("An error occurred while fetching quiz data:", error.message);
            throw error; // Rethrow the error to propagate it further if needed
        } else {
            console.error("An unknown error occurred:", error);
            throw new Error("An unknown error occurred");
        }
    }
}

// Function to rename a quiz
export async function renameQuiz(quizId:string, newQuizTitle:string) {
    const url = `${API_BASE_URL}/quizzes/${quizId}`;
    
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quizTitle: newQuizTitle }),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to rename quiz');
      }
    } catch (error) {
      throw new Error('An error occurred while renaming the quiz');
    }
  }

// Function to delete a quiz
export async function deleteQuiz(quizId:string) {
  const url = `${API_BASE_URL}/quizzes/${quizId}`;
  
  try {
    const response = await fetch(url, {
      method: 'DELETE', // Change method to DELETE
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to delete quiz'); // Update error message
    }
  } catch (error) {
    throw new Error('An error occurred while deleting the quiz'); // Update error message
  }
}
