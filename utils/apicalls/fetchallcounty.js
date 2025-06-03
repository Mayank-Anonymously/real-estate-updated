import axios from "axios";
import { HOST } from "../static";

export const fetchallcounty = async (setData, query) => {
  try {
    const response = await axios.get(
      `${HOST}property/get-properties-by-city/${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    setData(response.data);
  } catch (error) {
    console.error("Error fetching county listings:", error);
  }
};
