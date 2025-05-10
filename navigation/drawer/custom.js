import { View, Text, StyleSheet, Image } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import d from "../../assets/images/logo_comp/nj_house_map.png";
import CustomText from "../../components/common/Text";
import CustomTextBold from "../../components/common/BoldCustomtext";

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      <View>
        <View style={styles.drawerHeader}>
          <Image
            source={d}
            resizeMode="cover"
            style={{ resizeMode: "contain", width: 100, height: 100 }}
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <CustomTextBold style={{ fontSize: 30, color: "#051138" }}>
              AFFORDABLE{" "}
            </CustomTextBold>
            <CustomText style={{ fontSize: 20, color: "#051138" }}>
              NJ <CustomText>HOUSING</CustomText>{" "}
            </CustomText>
          </View>
        </View>
        <View>
          {[
            "Profile",
            "FAQs",
            "Lottery",
            "Subscription",
            "Privacy Policy",
            "Terms & Conditions",
            "Support",
          ].map((item) => (
            <DrawerItem label={item} labelStyle={styles.drawerLabel} />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>App Version 1.0.0</Text>
        <Text style={styles.footerText}>© 2025 Affordable NJ Housing</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    justifyContent: "space-between",
  },

  drawerHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFF",
  },
  drawerLabel: {
    fontSize: 16,
    color: "#444",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#6246EA",
    borderRadius: 10,
  },
  footerText: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
  },
});

export default CustomDrawer;
