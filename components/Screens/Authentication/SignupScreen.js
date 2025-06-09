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
import { useNavigation } from "@react-navigation/native";
import { SignupAPI } from "../../../utils/apicalls/SignupApi";
import CustomLogo from "../../CustomLogo";

export default function SignupScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

  const validateForm = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email.";
    }
    if (!passcode) newErrors.passcode = "Passcode is required.";
    else if (passcode.length < 6)
      newErrors.passcode = "Passcode must be at least 6 characters.";
    if (!confirmPasscode)
      newErrors.confirmPasscode = "Confirm passcode is required.";
    else if (confirmPasscode !== passcode)
      newErrors.confirmPasscode = "Passcodes do not match.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

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
         
          <CustomLogo
          image={require("../../../assets/images/background/login.png")}
           />
          
        </View>
        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.subtitle}>we need something more</Text>

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <TextInput
              style={styles.input}
              placeholder="Firstname"
              value={firstName}
              onChangeText={setFirstName}
            />
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.input}
              placeholder="Lastname"
              value={lastName}
              onChangeText={setLastName}
            />
            {errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}
          </View>
        </View>

        <TextInput
          style={styles.input}
          placeholder="yourmail@shrestha.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Passcode"
          secureTextEntry
          value={passcode}
          onChangeText={setPasscode}
        />
        {errors.passcode && (
          <Text style={styles.errorText}>{errors.passcode}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Confirm passcode"
          secureTextEntry
          value={confirmPasscode}
          onChangeText={setConfirmPasscode}
        />
        {errors.confirmPasscode && (
          <Text style={styles.errorText}>{errors.confirmPasscode}</Text>
        )}

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
  },
  input: {
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 4,
    marginTop: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: "#1F1D5B",
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
