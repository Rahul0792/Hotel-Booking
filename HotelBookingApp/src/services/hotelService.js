import api from "./api";

export const getHotels = async () => {
  try {
    const response = await api.get("/hotels");
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return [];
  }
};
