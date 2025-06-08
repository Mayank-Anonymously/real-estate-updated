import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
} from "react-native";
import { Checkbox } from "react-native-paper";
import * as Yup from "yup";
import { Formik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";

const validationSchemas = [
  Yup.object().shape({
    property: Yup.string().required("Property Location is required"),
  }),
  Yup.object().shape({
    salutation: Yup.string().required("Salutation is required"),
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string(),
    lastName: Yup.string().required("Last Name is required"),
    suffix: Yup.string(),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d+$/, "Phone must be digits only")
      .min(10, "Phone must be at least 10 digits")
      .required("Phone is required"),
    extension: Yup.string(),
    address1: Yup.string().required("Address Line 1 is required"),
    address2: Yup.string(),
    city2: Yup.string().required("City is required"),
    state2: Yup.string().required("State is required"),
  }),
  Yup.object().shape({
    headName: Yup.string().required("Head of Household Name is required"),
    dob: Yup.date()
      .max(new Date(), "Date of Birth cannot be in the future")
      .required("Date of Birth is required"),
    gender: Yup.string()
      .oneOf(["Male", "Female", "Transgender", "Other"], "Invalid Gender")
      .required("Gender is required"),
    disabled: Yup.boolean(),
    secondPerson: Yup.string()
      .oneOf(["Yes", "No"], "Select Yes or No")
      .required("Second person field is required"),
    njResident: Yup.string()
      .oneOf(["Yes", "No"], "Select Yes or No")
      .required("NJ Resident field is required"),
    grossIncome: Yup.number()
      .typeError("Combined gross annual income must be a number")
      .required("Combined gross annual income is required")
      .min(0, "Income cannot be negative"),
    monthlyRent: Yup.number()
      .typeError("Monthly rent payments must be a number")
      .required("Monthly rent payments are required")
      .min(0, "Rent cannot be negative"),
    veteran: Yup.string()
      .oneOf(["Yes", "No"], "Select Yes or No")
      .required("Veteran field is required"),
    section8: Yup.string()
      .oneOf(["Yes", "No"], "Select Yes or No")
      .required("Section 8 voucher field is required"),
    rentalAssistance: Yup.string()
      .oneOf(["Yes", "No"], "Select Yes or No")
      .required("Rental assistance field is required"),
  }),
  Yup.object().shape({
    income: Yup.number()
      .typeError("Annual Income must be a number")
      .required("Annual Income is required")
      .min(0, "Income cannot be negative"),
    rent: Yup.number()
      .typeError("Monthly Rent must be a number")
      .required("Monthly Rent is required")
      .min(0, "Rent cannot be negative"),
    householdSize: Yup.string()
      .oneOf(["1", "2", "3", "4", "5+"], "Invalid Household Size")
      .required("Total Household Size is required"),
    adaAccessible: Yup.boolean(),
    substandardHousing: Yup.boolean(),
    veteran: Yup.boolean(),
    studioContact: Yup.boolean(),
  }),
  Yup.object().shape({
    eSignature: Yup.string().required("Signature is required"),
    signatureDate: Yup.date()
      .max(new Date(), "Signature date cannot be in the future")
      .required("Signature date is required"),
    hearAbout: Yup.string()
      .oneOf(
        ["Social Media", "Friend", "Website", "Email", "Other"],
        "Select an option"
      )
      .required("Please select how you heard about COAH PRO"),
  }),
];

function ContactQueryform() {
  const [step, setStep] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const initialValues = {
    property: "",
    salutation: "",
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    email: "",
    phone: "",
    extension: "",
    address1: "",
    address2: "",
    city2: "",
    state2: "",
    headName: "",
    dob: null,
    gender: "",
    disabled: false,
    secondPerson: "",
    njResident: "",
    grossIncome: "",
    monthlyRent: "",
    veteran: "",
    section8: "",
    rentalAssistance: "",
    income: "",
    rent: "",
    householdSize: "",
    adaAccessible: false,
    substandardHousing: false,
    studioContact: false,
    eSignature: "",
    signatureDate: null,
    hearAbout: "",
  };

  const renderStep = ({
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
  }) => {
    switch (step) {
      case 1:
        return (
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              Pre-Application
            </Text>
            <Text>
              Before you begin, please ensure you have all your household and
              income details ready...
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Property Location"
              value={values.property}
              onChangeText={handleChange("property")}
              onBlur={handleBlur("property")}
            />
            {touched.property && errors.property && (
              <Text style={{ color: "red" }}>{errors.property}</Text>
            )}
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              1. Head of Household Information
            </Text>
            {[
              { name: "salutation", placeholder: "Salutation (Mr./Ms./Dr.)" },
              { name: "firstName", placeholder: "First Name" },
              { name: "middleName", placeholder: "Middle Name (optional)" },
              { name: "lastName", placeholder: "Last Name" },
              {
                name: "suffix",
                placeholder: "Suffix (e.g., Jr., Sr.) (optional)",
              },
              {
                name: "email",
                placeholder: "Email",
                keyboardType: "email-address",
              },
              {
                name: "phone",
                placeholder: "Phone",
                keyboardType: "phone-pad",
              },
              { name: "extension", placeholder: "Extension (optional)" },
              { name: "address1", placeholder: "Address Line 1" },
              { name: "address2", placeholder: "Address Line 2 (optional)" },
              { name: "city2", placeholder: "City" },
              { name: "state2", placeholder: "State" },
            ].map(({ name, placeholder, keyboardType }) => (
              <View key={name}>
                <TextInput
                  style={{ borderWidth: 1, marginVertical: 5, padding: 10 }}
                  placeholder={placeholder}
                  value={values[name]}
                  onChangeText={handleChange(name)}
                  onBlur={handleBlur(name)}
                  keyboardType={keyboardType || "default"}
                />
                {touched[name] && errors[name] && (
                  <Text style={{ color: "red" }}>{errors[name]}</Text>
                )}
              </View>
            ))}
          </View>
        );
      case 3:
        return (
          <ScrollView>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              3. Household Composition
            </Text>

            <TextInput
              style={{ borderWidth: 1, marginVertical: 5, padding: 10 }}
              placeholder="Head of Household Name (First and Last Name)"
              value={values.headName}
              onChangeText={handleChange("headName")}
              onBlur={handleBlur("headName")}
            />
            {touched.headName && errors.headName && (
              <Text style={{ color: "red" }}>{errors.headName}</Text>
            )}

            <TextInput
              style={{ borderWidth: 1, marginVertical: 5, padding: 10 }}
              placeholder="Date of Birth"
              value={values.dob ? values.dob.toLocaleDateString() : ""}
              onFocus={() => setShowDatePicker(true)}
            />
            {touched.dob && errors.dob && (
              <Text style={{ color: "red" }}>{errors.dob}</Text>
            )}
            {showDatePicker && (
              <DateTimePicker
                value={values.dob || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setFieldValue("dob", selectedDate);
                }}
              />
            )}

            <Text style={{ marginTop: 10, fontWeight: "bold" }}>Gender</Text>
            <ScrollView horizontal={true} style={{ flexDirection: "row" }}>
              {["Male", "Female", "Transgender", "Other"].map((option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={values.gender === option ? "checked" : "unchecked"}
                  onPress={() => setFieldValue("gender", option)}
                  style={{
                    borderWidth: 1,
                    margin: 5,
                    borderRadius: 10,
                    borderColor: "gray",
                    alignItems: "center",
                  }}
                />
              ))}
            </ScrollView>
            {touched.gender && errors.gender && (
              <Text style={{ color: "red" }}>{errors.gender}</Text>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Text>Is this household member permanently disabled?</Text>
              <Switch
                value={values.disabled || false}
                onValueChange={(val) => setFieldValue("disabled", val)}
                style={{ marginLeft: 10 }}
              />
            </View>

            <Text style={{ fontWeight: "bold" }}>
              Will a 2nd person be living in your home?
            </Text>
            <View style={{ flexDirection: "row" }}>
              {["Yes", "No"].map((option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={
                    values.secondPerson === option ? "checked" : "unchecked"
                  }
                  onPress={() => setFieldValue("secondPerson", option)}
                  style={{
                    borderWidth: 1,
                    margin: 5,
                    borderRadius: 10,
                    borderColor: "gray",
                    alignItems: "center",
                  }}
                />
              ))}
            </View>
            {touched.secondPerson && errors.secondPerson && (
              <Text style={{ color: "red" }}>{errors.secondPerson}</Text>
            )}

            <Text style={{ fontWeight: "bold" }}>
              Does your household live or work in New Jersey?
            </Text>
            <View style={{ flexDirection: "row" }}>
              {["Yes", "No"].map((option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={
                    values.njResident === option ? "checked" : "unchecked"
                  }
                  onPress={() => setFieldValue("njResident", option)}
                  style={{
                    borderWidth: 1,
                    margin: 5,
                    borderRadius: 10,
                    borderColor: "gray",
                    alignItems: "center",
                  }}
                />
              ))}
            </View>
            {touched.njResident && errors.njResident && (
              <Text style={{ color: "red" }}>{errors.njResident}</Text>
            )}

            <TextInput
              style={{ borderWidth: 1, marginVertical: 5, padding: 10 }}
              placeholder="Combined gross annual income (USD)"
              value={values.grossIncome}
              onChangeText={handleChange("grossIncome")}
              onBlur={handleBlur("grossIncome")}
              keyboardType="numeric"
            />
            {touched.grossIncome && errors.grossIncome && (
              <Text style={{ color: "red" }}>{errors.grossIncome}</Text>
            )}

            <TextInput
              style={{ borderWidth: 1, marginVertical: 5, padding: 10 }}
              placeholder="Monthly rent payments (USD)"
              value={values.monthlyRent}
              onChangeText={handleChange("monthlyRent")}
              onBlur={handleBlur("monthlyRent")}
              keyboardType="numeric"
            />
            {touched.monthlyRent && errors.monthlyRent && (
              <Text style={{ color: "red" }}>{errors.monthlyRent}</Text>
            )}

            <Text style={{ fontWeight: "bold" }}>Are you a veteran?</Text>
            <View style={{ flexDirection: "row" }}>
              {["Yes", "No"].map((option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={values.veteran === option ? "checked" : "unchecked"}
                  onPress={() => setFieldValue("veteran", option)}
                  style={{
                    borderWidth: 1,
                    margin: 5,
                    borderRadius: 10,
                    borderColor: "gray",
                    alignItems: "center",
                  }}
                />
              ))}
            </View>
            {touched.veteran && errors.veteran && (
              <Text style={{ color: "red" }}>{errors.veteran}</Text>
            )}

            <Text style={{ fontWeight: "bold" }}>
              Do you currently have a Section 8 housing choice voucher?
            </Text>
            <View style={{ flexDirection: "row" }}>
              {["Yes", "No"].map((option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={values.section8 === option ? "checked" : "unchecked"}
                  onPress={() => setFieldValue("section8", option)}
                  style={{
                    borderWidth: 1,
                    margin: 5,
                    borderRadius: 10,
                    borderColor: "gray",
                    alignItems: "center",
                  }}
                />
              ))}
            </View>
            {touched.section8 && errors.section8 && (
              <Text style={{ color: "red" }}>{errors.section8}</Text>
            )}

            <Text style={{ fontWeight: "bold" }}>
              Will you receive rental assistance from other sources?
            </Text>
            <View style={{ flexDirection: "row" }}>
              {["Yes", "No"].map((option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={
                    values.rentalAssistance === option ? "checked" : "unchecked"
                  }
                  onPress={() => setFieldValue("rentalAssistance", option)}
                  style={{
                    borderWidth: 1,
                    margin: 5,
                    borderRadius: 10,
                    borderColor: "gray",
                    alignItems: "center",
                  }}
                />
              ))}
            </View>
            {touched.rentalAssistance && errors.rentalAssistance && (
              <Text style={{ color: "red" }}>{errors.rentalAssistance}</Text>
            )}
          </ScrollView>
        );

      case 4:
        return (
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              4. Additional Information
            </Text>

            <TextInput
              style={{ borderWidth: 1, marginVertical: 5, padding: 10 }}
              placeholder="Annual Income"
              keyboardType="numeric"
              value={values.income}
              onChangeText={handleChange("income")}
              onBlur={handleBlur("income")}
            />
            {touched.income && errors.income && (
              <Text style={{ color: "red" }}>{errors.income}</Text>
            )}

            <TextInput
              style={{ borderWidth: 1, marginVertical: 5, padding: 10 }}
              placeholder="Monthly Rent"
              keyboardType="numeric"
              value={values.rent}
              onChangeText={handleChange("rent")}
              onBlur={handleBlur("rent")}
            />
            {touched.rent && errors.rent && (
              <Text style={{ color: "red" }}>{errors.rent}</Text>
            )}

            <Text style={{ fontWeight: "bold" }}>Total Household Size:</Text>
            <View style={{ flexDirection: "row" }}>
              {["1", "2", "3", "4", "5+"].map((size) => (
                <TouchableOpacity
                  key={size}
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    margin: 5,
                    borderRadius: 5,
                    backgroundColor:
                      values.householdSize === size ? "#007AFF" : "white",
                  }}
                  onPress={() => setFieldValue("householdSize", size)}
                >
                  <Text
                    style={{
                      color: values.householdSize === size ? "white" : "black",
                    }}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {touched.householdSize && errors.householdSize && (
              <Text style={{ color: "red" }}>{errors.householdSize}</Text>
            )}

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Barrier Free / ADA Accessible Home:</Text>
              <Switch
                value={values.adaAccessible || false}
                onValueChange={(val) => setFieldValue("adaAccessible", val)}
                style={{ marginLeft: 10 }}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Currently living in substandard/overcrowded housing:</Text>
              <Switch
                value={values.substandardHousing || false}
                onValueChange={(val) => setFieldValue("substandard")}
                style={{ marginLeft: 10 }}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Veteran:</Text>
              <Switch
                value={values.veteran || false}
                onValueChange={(val) => setFieldValue("veteran", val)}
                style={{ marginLeft: 10 }}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text>Studio Contact:</Text>
              <Switch
                value={values.studioContact || false}
                onValueChange={(val) => setFieldValue("studioContact", val)}
                style={{ marginLeft: 10 }}
              />
            </View>
          </View>
        );

      case 5:
        return (
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              5. Signature
            </Text>

            <TextInput
              style={{ borderWidth: 1, marginVertical: 5, padding: 10 }}
              placeholder="Electronic Signature"
              value={values.eSignature}
              onChangeText={handleChange("eSignature")}
              onBlur={handleBlur("eSignature")}
            />
            {touched.eSignature && errors.eSignature && (
              <Text style={{ color: "red" }}>{errors.eSignature}</Text>
            )}

            <TextInput
              style={{ borderWidth: 1, marginVertical: 5, padding: 10 }}
              placeholder="Signature Date"
              value={
                values.signatureDate
                  ? values.signatureDate.toLocaleDateString()
                  : ""
              }
              onFocus={() => setShowDatePicker(true)}
            />
            {touched.signatureDate && errors.signatureDate && (
              <Text style={{ color: "red" }}>{errors.signatureDate}</Text>
            )}
            {showDatePicker && (
              <DateTimePicker
                value={values.signatureDate || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate)
                    setFieldValue("signatureDate", selectedDate);
                }}
              />
            )}

            <Text style={{ marginTop: 10, fontWeight: "bold" }}>
              How did you hear about COAH PRO?
            </Text>
            {["Social Media", "Friend", "Website", "Email", "Other"].map(
              (option) => (
                <Checkbox.Item
                  key={option}
                  label={option}
                  status={values.hearAbout === option ? "checked" : "unchecked"}
                  onPress={() => setFieldValue("hearAbout", option)}
                  style={{
                    borderWidth: 1,
                    margin: 5,
                    borderRadius: 10,
                    borderColor: "gray",
                    alignItems: "center",
                  }}
                />
              )
            )}
            {touched.hearAbout && errors.hearAbout && (
              <Text style={{ color: "red" }}>{errors.hearAbout}</Text>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchemas[step - 1]}
      onSubmit={(values) => {
        if (step === validationSchemas.length) {
          alert("Form submitted successfully!");
          console.log(values);
        } else {
          setStep(step + 1);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <ScrollView style={{ padding: 20, backgroundColor: "white", flex: 1 }}>
          {renderStep({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
          })}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            {step > 1 && (
              <TouchableOpacity
                onPress={() => setStep(step - 1)}
                style={{
                  padding: 10,
                  backgroundColor: "#ccc",
                  borderRadius: 5,
                  minWidth: 100,
                  alignItems: "center",
                }}
              >
                <Text>Back</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                padding: 10,
                backgroundColor: "#007AFF",
                borderRadius: 5,
                minWidth: 100,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>
                {step === validationSchemas.length ? "Submit" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  notice: {
    marginBottom: 15,
    fontStyle: "italic",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  progress: {
    height: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 15,
  },
  radioGroup: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxItem: {
    backgroundColor: "#f9f9f9",
    marginVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingLeft: 8,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 15,
  },
});

export default ContactQueryform;
