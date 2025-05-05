import axios from "axios";
import { Alert } from "react-native";
import { HOST } from "../static";

export const submitContactQuery = async (formData, navigation, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.post(`${HOST}contact/query`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);
    Alert.alert("Success", response.data.message);
    navigation.goBack();
  } catch (error) {
    setLoading(false);
    if (error.response) {
      Alert.alert("Error", error.response.data.message);
    } else {
      Alert.alert("Error", "Network error. Please try again later.");
    }
  }
};
