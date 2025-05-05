import axios from "axios";
import { HOST } from "../static";

export const fetchSearchProperties = async (query, setData) => {
  try {
    const response = await axios.get(
      `${HOST}property/search-properties/${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    setData(response.data);
    // setData(response.data.property);
  } catch (error) {
    console.error("Error fetching search properties:", error);
  }
};
