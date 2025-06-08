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
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../../common/Text";
import CustomLogo from "../../CustomLogo";
import Botttombar from "./Botttombar";
const Splashone = () => {
  const navigation = useNavigation();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Hind-Jalandhar": require("../../../assets/fonts/Hind/Hind-Regular.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View style={{ marginHorizontal: 50 }}>
          <CustomLogo
            image={require("../../../assets/images/logo_comp/nj_house_map.png")}
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <CustomText
              style={[
                styles.text,
                {
                  fontSize: 25,
                  marginTop: 30,
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
                  fontSize: 24,
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
              Find homes, check your eligibility, and get expert guidance - all
              in one app
            </Text>
          </View>
        </View>
      </SafeAreaView>
      <View
        style={{
          backgroundColor: "white",
        }}
      >
        <Botttombar
          title="Get Started"
          navigation={() => navigation.navigate("Splashtwo")}
        />
      </View>
    </>
  );
};

export default Splashone;

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
