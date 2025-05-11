import axios from "axios";
import { HOST } from "../static";

export const fetchFilters = async (
  setPropertyTypes,
  setBedrooms,
  setBathrooms,
  setFilters
) => {
  try {
    const response = await axios.get(`${HOST}property/filters/descriptions`);

    const { filters, propertyTypes, bedrooms, bathrooms } = response.data;

    // Set the different filters
    setFilters(filters); // General filters like location, etc.
    setPropertyTypes(propertyTypes); // Property types (Apartment, House, etc.)
    setBedrooms(bedrooms); // List of unique bedrooms options
    setBathrooms(bathrooms); // List of unique bathrooms options
  } catch (error) {
    console.error("Failed to fetch filters", error.message);
  }
};
