import axios from "axios";
import { HOST } from "../static";

export const fetchallcity = async (setData) => {
  try {
    const response = await axios.get(`${HOST}property/get-properties-by-city`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    setData(response.data);
  } catch (error) {
    console.error("Error fetching county listings:", error);
  }
};
