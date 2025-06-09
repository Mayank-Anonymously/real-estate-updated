import axios from "axios";
import { Alert } from "react-native";
import { HOST } from "../static";

export const updateSubscription = async (formData, id , navigation) => {
  console.log(`${HOST}auth/update-subscription-by-user_id/${id}`, formData);

  try {
    const response = await axios.post(
      `${HOST}auth/update-subscription-by-user_id/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

        if  ( response.data.message === "Subscription updated successfully") {
                
                
                navigation.navigate("Root")

        }
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    // if (error.response?.data?.message) {
    //   Alert.alert("Error", error.response.data.message);
    // } else {
    //   Alert.alert("Error", "Network error. Please try again later.");
    // }
  }
};
