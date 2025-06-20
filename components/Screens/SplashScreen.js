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
import { WebView } from "react-native-webview";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CustomTextBold from "../common/BoldCustomtext";
import CustomText from "../common/Text";
import CustomTextLight from "../common/CustomTextLight";
import CustomLogo from "../CustomLogo";
const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => navigation.navigate("Root"), [1000]);
    async function loadFonts() {
      await Font.loadAsync({
        "Hind-Jalandhar": require("../../assets/fonts/Hind/Hind-Regular.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);
  return (
    <ImageBackground
      style={[
        styles.container,
        {
          justifyContent: "space-between",
        },
      ]}
      source={require("../../assets/images/background/back.png")}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />

        <View
          style={{
            marginHorizontal: 50,
            backgroundColor: "#051138",
            padding: 30,
            borderRadius: 10,
          }}
        >
          <CustomLogo
            color={"white"}
            image={require("../../assets/images/logo_comp/nj_house_map.png")}
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <CustomText
              style={[
                styles.text,
                {
                  fontSize: 20,
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
                  color: "white",
                  marginTop: 30,
                  fontWeight: "200",
                  textAlign: "center",
                },
              ]}
            >
              Find homes, check your eligibility, and get expert guidance - all
              in one app
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    color: "white",
  },
});
