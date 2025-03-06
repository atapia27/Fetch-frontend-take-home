import axios from "axios";

const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

// Fetch dog details
export const fetchDogDetails = async (dogIds: string[]) => {
  try {
    if (dogIds.length === 0) return [];

    const response = await axios.post(`${API_BASE_URL}/dogs`, dogIds, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch dog details:", error);
    return [];
  }
};

// Fetch dogs (with additional filters)
export const fetchDogs = async (
  breeds: string[],
  zipCodes: string[],
  ageMin: number | null,
  ageMax: number | null,
  sortField: string,
  sortOrder: "asc" | "desc",
  page: number,
  size: number, 
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dogs/search`, {
      params: {
        breeds: breeds.length > 0 ? breeds : undefined,
        zipCodes: zipCodes.length > 0 ? zipCodes : undefined,
        ageMin: ageMin ?? undefined,
        ageMax: ageMax ?? undefined,
        sort: `${sortField}:${sortOrder}`,
        size, 
        from: (page - 1) * size, 
      },
      withCredentials: true,
    });

    console.log("API Response (IDs):", response.data);

    const dogIds = response.data.resultIds || [];
    const totalResults = response.data.total || 0;

    const dogs = await fetchDogDetails(dogIds);

    return { dogs, totalResults };
  } catch (error) {
    console.error("Failed to fetch dogs:", error);
    return { dogs: [], totalResults: 0 };
  }
};


