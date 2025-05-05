import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SignupAPI } from "../../../utils/apicalls/SignupApi";

export default function SignupScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const userData = {
      firstName,
      lastName,
      email,
      password: passcode,
    };
    await SignupAPI(
      passcode,
      confirmPasscode,
      userData,
      setLoading,
      navigation
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={styles.image}
            source={require("../../../assets/images/background/login.png")}
            resizeMode="cover" // Or "contain", depending on desired fit
          />
        </View>
        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.subtitle}>we need something more</Text>

        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder="Firstname"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Lastname"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="yourmail@shrestha.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Passcode"
          secureTextEntry
          value={passcode}
          onChangeText={setPasscode}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm passcode"
          secureTextEntry
          value={confirmPasscode}
          onChangeText={setConfirmPasscode}
        />

        <Text style={styles.label}>TYPE OF USER</Text>
        <TextInput
          style={styles.input}
          placeholder="Choose your user-type"
          value={userType}
          onChangeText={setUserType}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.submitText}>Submit</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backToLogin}>back to login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: 100,
    height: 100,
  },
  scrollContainer: {
    padding: 24,
    justifyContent: "center",
  },
  titleTop: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F1D5B",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitleTop: {
    fontSize: 14,
    color: "#1F1D5B",
    textAlign: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1F1D5B",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#1F1D5B",
    textAlign: "center",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: "#999",
    marginBottom: 6,
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: "#3E5BF5",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
    justifyContent: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  backToLogin: {
    fontSize: 14,
    color: "#1F1D5B",
    textAlign: "center",
  },
});
