import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
  Button,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import * as Yup from "yup";
import { submitContactQuery } from "../utils/apicalls/submitQuery";

const totalSteps = 5;

const validationSchemas = [
  Yup.object().shape({
    property: Yup.string().required("Property location is required"),
  }),
  Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
  }),
  Yup.object().shape({
    dob: Yup.date().required("Date of birth is required"),
  }),
  Yup.object().shape({
    income: Yup.number().required("Annual income is required"),
    rent: Yup.number().required("Monthly rent is required"),
  }),
  Yup.object().shape({
    signature: Yup.string().required("Signature is required"),
    referral: Yup.string().required("Referral info is required"),
  }),
];

const ContactQueryForm = () => {
  const [step, setStep] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const initialValues = {
    property: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    disabled: false,
    income: "",
    rent: "",
    veteran: false,
    signature: "",
    referral: "",
  };

  const renderStep = (formikProps) => {
    const { values, handleChange, setFieldValue, errors, touched } = formikProps;

    switch (step) {
      case 0:
        return (
          <View>
            <Text style={styles.header}>1. Select Property</Text>
            <TextInput
              style={styles.input}
              placeholder="Property Location"
              value={values.property}
              onChangeText={handleChange("property")}
            />
            {touched.property && errors.property && (
              <Text style={styles.error}>{errors.property}</Text>
            )}
          </View>
        );

      case 1:
        return (
          <View>
            <Text style={styles.header}>2. Head of Household Information</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={values.firstName}
              onChangeText={handleChange("firstName")}
            />
            {touched.firstName && errors.firstName && (
              <Text style={styles.error}>{errors.firstName}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={values.lastName}
              onChangeText={handleChange("lastName")}
            />
            {touched.lastName && errors.lastName && (
              <Text style={styles.error}>{errors.lastName}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={values.email}
              onChangeText={handleChange("email")}
            />
            {touched.email && errors.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Phone"
              keyboardType="phone-pad"
              value={values.phone}
              onChangeText={handleChange("phone")}
            />
            {touched.phone && errors.phone && (
              <Text style={styles.error}>{errors.phone}</Text>
            )}
          </View>
        );

      case 2:
        return (
          <View>
            <Text style={styles.header}>3. Household Composition</Text>
            <TextInput
              style={styles.input}
              placeholder="Date of Birth"
              value={values.dob ? new Date(values.dob).toLocaleDateString() : ""}
              onFocus={() => setShowDatePicker(true)}
            />
            {showDatePicker && (
              <DateTimePicker
                value={values.dob ? new Date(values.dob) : new Date()}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowDatePicker(false);
                  if (date) setFieldValue("dob", date);
                }}
              />
            )}
            {touched.dob && errors.dob && (
              <Text style={styles.error}>{errors.dob}</Text>
            )}
            <View style={styles.switchContainer}>
              <Text>Is Disabled:</Text>
              <Switch
                value={values.disabled}
                onValueChange={(val) => setFieldValue("disabled", val)}
              />
            </View>
          </View>
        );

      case 3:
        return (
          <View>
            <Text style={styles.header}>4. Additional Information</Text>
            <TextInput
              style={styles.input}
              placeholder="Annual Income"
              keyboardType="numeric"
              value={values.income}
              onChangeText={handleChange("income")}
            />
            {touched.income && errors.income && (
              <Text style={styles.error}>{errors.income}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Monthly Rent"
              keyboardType="numeric"
              value={values.rent}
              onChangeText={handleChange("rent")}
            />
            {touched.rent && errors.rent && (
              <Text style={styles.error}>{errors.rent}</Text>
            )}
            <View style={styles.switchContainer}>
              <Text>Veteran:</Text>
              <Switch
                value={values.veteran}
                onValueChange={(val) => setFieldValue("veteran", val)}
              />
            </View>
          </View>
        );

      case 4:
        return (
          <View>
            <Text style={styles.header}>5. Signature</Text>
            <TextInput
              style={styles.input}
              placeholder="E-Signature"
              value={values.signature}
              onChangeText={handleChange("signature")}
            />
            {touched.signature && errors.signature && (
              <Text style={styles.error}>{errors.signature}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="How did you hear about us?"
              value={values.referral}
              onChangeText={handleChange("referral")}
            />
            {touched.referral && errors.referral && (
              <Text style={styles.error}>{errors.referral}</Text>
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
      validationSchema={validationSchemas[step]}
      onSubmit={async (values) => {
        try {
          await submitContactQuery(values); // You should define this
          alert("Submitted successfully!");
        } catch (error) {
          console.error("Error submitting:", error);
          alert("Submission failed.");
        }
      }}
    >
      {(formikProps) => (
        <ScrollView contentContainerStyle={styles.container}>
          <ProgressBar
            progress={(step + 1) / totalSteps}
            color={"#6200ee"}
            style={styles.progress}
          />
          {renderStep(formikProps)}
          <View style={styles.buttonRow}>
            {step > 0 && <Button title="Back" onPress={() => setStep(step - 1)} />}
            {step < totalSteps - 1 ? (
              <Button
                title="Next"
                onPress={() => {
                  formikProps.validateForm().then((errors) => {
                    if (Object.keys(errors).length === 0) {
                      setStep(step + 1);
                    } else {
                      formikProps.setTouched(errors);
                    }
                  });
                }}
              />
            ) : (
              <Button title="Submit" onPress={formikProps.handleSubmit} />
            )}
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
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
  },
});

export default ContactQueryForm;
