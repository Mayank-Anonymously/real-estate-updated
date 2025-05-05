import axios from "axios";
import { HOST } from "../static";

export const fetchpropdetails = async (setData, id) => {
  try {
    const response = await axios.get(`${HOST}property/get-detail-by-id/${id}`, {
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
