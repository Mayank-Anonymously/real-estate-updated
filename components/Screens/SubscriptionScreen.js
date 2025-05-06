import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const SubscriptionScreen = () => {
  const route = useRoute();
  const { title, address } = route?.params ?? "";
  const navigation = useNavigation();
  const handleSubscribe = () => {
    navigation.navigate("Contact_now", {
      title: title,
      address: address,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Choose Your Plan</Text>

        <View style={styles.card}>
          <Text style={[styles.planTitle, { color: "#000" }]}>Free Plan</Text>
          <View style={styles.feature}>
            <Ionicons name="checkmark-circle" size={20} color="#6246EA" />
            <Text style={styles.featureText}>
              View all listings (no pricing)
            </Text>
          </View>
          <View style={styles.feature}>
            <Ionicons name="checkmark-circle" size={20} color="#6246EA" />
            <Text style={styles.featureText}>
              Create account & save preferences
            </Text>
          </View>
        </View>

        <View style={[styles.card, styles.premiumCard]}>
          <Text style={styles.planTitle}>Premium Plan</Text>
          <Text style={styles.price}>$29 / month</Text>

          <View style={styles.feature}>
            <Ionicons name="star" size={20} color="#fff" />
            <Text style={styles.featureTextPremium}>
              Access to Diane Gloria’s housing videos
            </Text>
          </View>

          <View style={styles.feature}>
            <Ionicons name="star" size={20} color="#fff" />
            <Text style={styles.featureTextPremium}>
              Automatic alerts for new lotteries
            </Text>
          </View>

          <View style={styles.feature}>
            <Ionicons name="star" size={20} color="#fff" />
            <Text style={styles.featureTextPremium}>
              We apply for lotteries on your behalf
            </Text>
          </View>
        </View>

        {/* Subscribe Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubscribe}>
          <Text style={styles.buttonText}>Subscribe Now</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Cancel anytime. Applications will be submitted manually on 3rd-party
          portals with your consent.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#6246EA",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    marginBottom: 20,
    elevation: 3,
  },
  premiumCard: {
    backgroundColor: "#917AFD",
  },
  planTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#fff",
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#fff",
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  featureTextPremium: {
    marginLeft: 10,
    fontSize: 16,
    color: "#fff",
  },
  button: {
    backgroundColor: "#6246EA",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  disclaimer: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
});

export default SubscriptionScreen;
