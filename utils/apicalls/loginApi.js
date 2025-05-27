import axios from "axios";
import { HOST } from "../static";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../../redux/slices/user";

export const loginApi = async (
  email,
  password,
  router,
  setErros,
  setLoading,
  dispatch
) => {
  setLoading(true);
  try {
    const data = {
      email: email,
      password: password,
    };
    setLoading(true);

    axios
      .post(`${HOST}auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        setLoading(false);
        router.navigate("Root");
        dispatch(setUser(response.data));
        await AsyncStorage.setItem("isAuthenticated", "true");
        await AsyncStorage.setItem("userEmail", email);
        await AsyncStorage.setItem(
          "user_name",
          response.data.firstName + " " + response.data.lastName
        );
      })

      .catch((error) => {
        if (error.response) {
          setLoading(false);

          setErros(
            error.response.data.message +
              " " +
              "or" +
              " " +
              "User Not Authenticated"
          );
        } else {
          setLoading(false);

          setErros(error.message + " " + "or" + "User Not Authenticated");
        }
      });
  } catch (error) {
    console.error("Error fetching county listings:", error);
  }
};
