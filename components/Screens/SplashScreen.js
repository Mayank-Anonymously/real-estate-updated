import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  StatusBar,
} from "react-native";
import React, { useEffect } from "react";

import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CustomTextBold from "../common/BoldCustomtext";
import CustomText from "../common/Text";
import CustomTextLight from "../common/CustomTextLight";
const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Hind-Jalandhar": require("../../assets/fonts/Hind/Hind-Regular.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={{ marginHorizontal: 50 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <CustomTextBold style={{ fontSize: 38, color: "#051138" }}>
              AFFORDABLE{" "}
            </CustomTextBold>
            <CustomTextBold style={{ fontSize: 30, color: "#051138" }}>
              NJ <CustomText>HOUSING</CustomText>{" "}
            </CustomTextBold>
          </View>
          <Image
            source={require("../../assets/images/logo_comp/nj_house_map.png")}
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <CustomText
            style={[
              styles.text,
              {
                fontSize: 30,
                marginTop: 20,
                fontWeight: "200",
              },
            ]}
          >
            Affordable Housing,
          </CustomText>
          <CustomText
            style={[
              styles.text,
              {
                fontSize: 30,
                fontWeight: "200",
              },
            ]}
          >
            Made Simple.
          </CustomText>
          <Text
            style={[
              styles.text,
              {
                fontSize: 15,
                color: "gray",
                marginTop: 30,
                fontWeight: "200",
                textAlign: "center",
              },
            ]}
          >
            Find homes, check your eligibility, and get expert guidance - all in
            one app
          </Text>

          <Button
            mode="contained"
            outlineColor="#6246ea"
            onPress={() => navigation.navigate("Login")}
            buttonColor="#051138"
            style={{
              width: 300,
              borderColor: "#6246ea",

              marginHorizontal: 20,
              marginTop: 20,
              marginRight: 20,
            }}
          >
            GET STARTED
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  content: {
    justifyContent: "center",
    width: "100%",
    height: 600,
    // alignItems: "center",
    position: "absolute",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    color: "black",
  },
});
