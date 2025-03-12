export default interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

// Define expected API response types
export interface DogResponse {
  resultIds: string[];
  total: number;
}

export interface MatchResponse {
  match: string;
}