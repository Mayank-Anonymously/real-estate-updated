import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Alert, ActivityIndicator, Button } from "react-native";
import { WebView } from "react-native-webview";
import { useDispatch } from "react-redux";

const StripeCheckoutButton = () => {
  const route = useRoute();
  const { name, amount } = route.params;
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleStripeCheckout = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://192.168.1.8:9292/payment-gateway/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            amount: amount, // in cents for $10
            currency: "USD",
            successUrl: "https://simfys.com/success",
            failedUrl: "https://simfys.com/cancel",
          }),
        }
      );

      const data = await response.json();
      if (data?.url) {
        setCheckoutUrl(data.url);
      } else {
        Alert.alert("Error", "Failed to create checkout session");
      }
    } catch (error) {
      console.error("Checkout error", error);
      Alert.alert("Error", "Something went wrong with checkout.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(
    () =>
      setTimeout(() => {
        handleStripeCheckout();
      }, 2000),
    []
  );

  if (checkoutUrl) {
    return (
      <WebView
        source={{ uri: checkoutUrl }}
        style={{ flex: 1 }}
        javaScriptEnabled
        domStorageEnabled
        onNavigationStateChange={(navState) => {
          if (navState.url === "https://simfys.com/success") {
          }
        }}
      />
    );
  }

  return (
    <View style={{ marginTop: 20 }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default StripeCheckoutButton;
