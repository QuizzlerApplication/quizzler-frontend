
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

// Add question to api 
export async function addQuestion(quizId: string, questionData: QuestionData){
    const url = `/api/quizzes/${quizId}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionData),
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }
    
        const data = await response.json();
        return data;
    } catch (error ) {
        // handle err here 
        if (error instanceof Error) {
            console.error("An error occurred while fetching quiz data:", error.message);
            throw error; // Rethrow the error to propagate it further if needed
        } else {
            console.error("An unknown error occurred:", error);
            throw new Error("An unknown error occurred");
        }
    }
  };
  
