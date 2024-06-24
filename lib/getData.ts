export const BASE_URL = "https://jsonplaceholder.typicode.com";

// Define a generic getData function
export const getData = async <T>(endpoint: string): Promise<T | null> => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    return null;
  }
};
