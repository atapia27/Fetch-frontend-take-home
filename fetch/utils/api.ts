import axios from "axios";
import { useFavoritesStore } from "@/(features)/favorites/store/favoritesStore";
import Dog from "./types";

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
  size: number
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

    const dogIDs = response.data.resultIds || []; //  Store the dog IDs
    const totalResults = response.data.total || 0;

    const dogs = await fetchDogDetails(dogIDs);

    return { dogIDs, dogs, totalResults }; //  Return dogIDs too
  } catch (error) {
    console.error("Failed to fetch dogs:", error);
    return { dogIDs: [], dogs: [], totalResults: 0 };
  }
};


export const fetchMatch = async () => {
  try {
    const { favoriteDogIDs } = useFavoritesStore.getState();

    if (favoriteDogIDs.length === 0) {
      console.error("No favorite dogs selected for matching.");
      return null;
    }

    console.log("Sending favorites to /dogs/match:", favoriteDogIDs);

    // Step 1: Send favorite dog IDs to /dogs/match
    const matchResponse = await axios.post(
      `${API_BASE_URL}/dogs/match`,
      favoriteDogIDs, 
      { withCredentials: true },
    );

    console.log("Match response:", matchResponse.data);

    const matchedDogId = matchResponse.data.match;
    if (!matchedDogId) {
      console.error("No match received from /dogs/match.");
      return null;
    }

    // Step 2: Fetch full details of matched dog
    const detailsResponse = await axios.post(
      `${API_BASE_URL}/dogs`,
      [matchedDogId], 
      { withCredentials: true },
    );

    console.log("Matched dog details:", detailsResponse.data);

    return detailsResponse.data[0]; // Return first dog in response
  } catch (error) {
    console.error("Error fetching match:", error);
    return null;
  }
};
