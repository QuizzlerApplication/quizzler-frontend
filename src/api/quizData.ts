
// Define a function to fetch quiz data from the API
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

