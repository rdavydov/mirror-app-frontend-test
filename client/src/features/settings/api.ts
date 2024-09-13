import axios from "axios";

const API_URL = "http://localhost:4000/settings";

export const getSettings = async (): Promise<any> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
};
