import axios from "axios";
import { Alert } from "react-native";
import { HOST } from "../static";

export const SignupAPI = async (
  passcode,
  confirmPasscode,
  userData,
  setLoading,
  navigation
) => {
  setLoading(true);
  if (passcode !== confirmPasscode) {
    setLoading(false);

    Alert.alert("Error", "Passwords do not match!");
    return;
  }

  setLoading(true);

  //   try {
  const response = await axios.post(`${HOST}auth/register`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  setLoading(false);
  navigation.navigate("VerifyOtp", {
    email: userData.email,
  });
  Alert.alert("Success", response.data.message);

  //   } catch (error) {
  //     setLoading(false);

  //     if (error.response) {
  //       Alert.alert("Error", error.response.data.message);
  //     } else if (error.request) {
  //       Alert.alert("Error", "Network error. Please try again later.");
  //     } else {
  //       Alert.alert("Error", "An error occurred. Please try again.");
  //     }
  //   }
};
