
// Define a function to fetch quiz data from the API
export async function fetchQuizData(url:string) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch quiz data");
    }
    return response.json();
}