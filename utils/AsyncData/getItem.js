import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

// Function to get the stored user name
export const getUserName = async (setValue) => {
  try {
    const userName = await AsyncStorage.getItem("user_name");
    if (userName !== null) {
      // Use the userName (e.g., display it or do something with it)
      setValue(userName);
    } else {
      console.log("No user name found");
    }
  } catch (error) {
    console.error("Error retrieving user name", error);
  }
};

export const getUserEmail = async (setEmail) => {
  try {
    const userName = await AsyncStorage.getItem("userEmail");
    if (userName !== null) {
      // Use the userName (e.g., display it or do something with it)
      setEmail(userName);
    } else {
      console.log("No user name found");
    }
  } catch (error) {
    console.error("Error retrieving user name", error);
  }
};
