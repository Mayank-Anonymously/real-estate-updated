import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomText from "./common/Text";
import { submitContactQuery } from "../utils/apicalls/submitQuery";

const ContactQueryForm = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { title, address } = route.params;
  const [loading, setLoading] = useState(false);
  // State to hold form data
  const [formData, setFormData] = useState({
    title: title || "",
    address: address || "",
    name: "",
    contactNo: "",
    email: "",
    query: "",
  });

  // State for form validation
  const [errors, setErrors] = useState({
    title: false,
    address: false,
    name: false,
    contactNo: false,
    email: false,
    query: false,
  });

  // Function to handle input changes
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {
      title: !formData.title,
      address: !formData.address,
      name: !formData.name,
      contactNo: !formData.contactNo,
      email: !formData.email,
      query: !formData.query,
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (validateForm()) {
      await submitContactQuery(formData, navigation, setLoading);
      alert(
        "Your query has been received successfully. We will contact you shortly."
      );
    } else {
      alert("Please fill in all the fields.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Form Inputs */}
      <CustomText style={styles.title}>Interested In Property</CustomText>
      <CustomText style={styles.subtitle}>Send us your query for</CustomText>

      <View style={styles.input}>
        <TextInput
          placeholder="Property title"
          value={formData.title}
          onChangeText={(text) => handleInputChange("title", text)}
          disabled={true}
        />
        {errors.title && (
          <Text style={styles.errorText}>This field is required</Text>
        )}
      </View>

      <View style={styles.input}>
        <TextInput
          placeholder="Address and location"
          value={formData.address}
          onChangeText={(text) => handleInputChange("address", text)}
        />
        {errors.address && (
          <Text style={styles.errorText}>This field is required</Text>
        )}
      </View>

      <View style={styles.input}>
        <TextInput
          placeholder="Your name"
          value={formData.name}
          disabled={true}
          onChangeText={(text) => handleInputChange("name", text)}
        />
        {errors.name && (
          <Text style={styles.errorText}>This field is required</Text>
        )}
      </View>

      <View style={styles.row}>
        <View style={[styles.input, { flex: 1, marginRight: 8 }]}>
          <TextInput
            placeholder="Contact No"
            value={formData.contactNo}
            onChangeText={(text) => handleInputChange("contactNo", text)}
          />
          {errors.contactNo && (
            <Text style={styles.errorText}>This field is required</Text>
          )}
        </View>
        <View style={[styles.input, { flex: 1, marginLeft: 8 }]}>
          <TextInput
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          {errors.email && (
            <Text style={styles.errorText}>This field is required</Text>
          )}
        </View>
      </View>

      <View style={[styles.input, { height: 100 }]}>
        <TextInput
          placeholder="Query"
          multiline
          style={{ flex: 1, textAlignVertical: "top" }}
          value={formData.query}
          onChangeText={(text) => handleInputChange("query", text)}
        />
        {errors.query && (
          <Text style={styles.errorText}>This field is required</Text>
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <CustomText style={styles.submitButtonText}>SUBMIT</CustomText>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: "#3E5BF5",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default ContactQueryForm;
