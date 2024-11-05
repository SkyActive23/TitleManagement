// src/services/title.ts
import api from './api'; // Assuming `api` is an axios instance with the base URL and token setup

interface TitleData {
  title: string;
}

export const fetchTitles = async () => {
    try {
        const response = await api.get("/title");
        return response.data;
      } catch (error) {
        console.error("Error fetching titles:", error);
        throw error;
      }
};

export const addTitle = async (title: string) => {
    try {
        const response = await api.post("/title", { title});
        return response.data;
      } catch (error) {
        console.error("Error creating title:", error);
        throw error;
      }
};


export const deleteTitle = async (uuid: string) => {
  try {
    console.log("Attempting to delete title with UUID:", uuid); // Log before making delete request
    const response = await api.delete(`/title/${uuid}`);
    console.log("Delete response data:", response.data); // Log the response from the delete request
    return response.data;
  } catch (error) {
    console.error("Error deleting title:", error);
    throw error;
  }
};

export const editTitle = async (uuid: string, title: string) => {
  try {
    console.log("Attempting to edit title with UUID:", uuid, "New title:", title, "New details:"); // Log edit attempt
    const response = await api.put(`/title/${uuid}`, { title});
    console.log("Edit response data:", response.data); // Log the response from the edit request
    return response.data;
  } catch (error) {
    console.error("Error editing title:", error);
    throw error;
  }
};

