import axios from "axios";
import { HOST } from "../static";

export const fetchallcounty = async (setData, query) => {
  try {
    console.log(`${HOST}property/get-properties-by-city/${query}`);
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
