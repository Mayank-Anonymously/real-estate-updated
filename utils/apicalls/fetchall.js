import axios from "axios";
import { HOST } from "../static";

export const fetchallcity = async (setData) => {
  console.log(`${HOST}property/get-all-properties-city`);
  try {
    const response = await axios.get(
      `${HOST}property/get-all-properties-city`,
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
