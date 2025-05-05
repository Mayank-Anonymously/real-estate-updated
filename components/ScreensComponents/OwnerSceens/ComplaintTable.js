import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const complaintData = [
  { id: 1, tenant: "John Doe", issue: "Leaking Pipe", severity: "High" },
  { id: 2, tenant: "Jane Smith", issue: "Broken AC", severity: "Medium" },
  { id: 3, tenant: "Raj Kumar", issue: "Noisy Neighbor", severity: "Low" },
  { id: 4, tenant: "Alice Lee", issue: "Power Issue", severity: "High" },
  { id: 5, tenant: "Tom Hardy", issue: "Water Shortage", severity: "Medium" },
];

const ComplaintsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 2;

  const totalPages = Math.ceil(complaintData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = complaintData.slice(startIndex, startIndex + rowsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Tenant Complaints Severity</Text>

      {/* Table Header */}
      <View style={styles.tableRowHeader}>
        <Text style={[styles.tableCell, styles.boldText]}>Tenant</Text>
        <Text style={[styles.tableCell, styles.boldText]}>Issue</Text>
        <Text style={[styles.tableCell, styles.boldText]}>Severity</Text>
      </View>

      {/* Table Rows */}
      {currentData.map((item) => (
        <View key={item.id} style={styles.tableRow}>
          <Text style={styles.tableCell}>{item.tenant}</Text>
          <Text style={styles.tableCell}>{item.issue}</Text>
          <Text
            style={[
              styles.tableCell,
              item.severity === "High"
                ? styles.high
                : item.severity === "Medium"
                ? styles.medium
                : styles.low,
            ]}
          >
            {item.severity}
          </Text>
        </View>
      ))}

      {/* Pagination */}
      <View style={styles.pagination}>
        <TouchableOpacity onPress={prevPage} disabled={currentPage === 1}>
          <Text
            style={[styles.pageButton, currentPage === 1 && styles.disabled]}
          >
            ◀ Previous
          </Text>
        </TouchableOpacity>

        <Text style={styles.pageInfo}>
          Page {currentPage} of {totalPages}
        </Text>

        <TouchableOpacity
          onPress={nextPage}
          disabled={currentPage === totalPages}
        >
          <Text
            style={[
              styles.pageButton,
              currentPage === totalPages && styles.disabled,
            ]}
          >
            Next ▶
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ComplaintsTable;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 10,
    marginVertical: 20,
    padding: 10,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tableRowHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
  },
  boldText: {
    fontWeight: "bold",
  },
  high: {
    color: "#e74c3c",
    fontWeight: "bold",
  },
  medium: {
    color: "#f39c12",
    fontWeight: "bold",
  },
  low: {
    color: "#2ecc71",
    fontWeight: "bold",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  pageButton: {
    color: "#3498db",
    fontWeight: "bold",
    fontSize: 14,
  },
  disabled: {
    color: "#ccc",
  },
  pageInfo: {
    fontSize: 14,
    color: "#555",
  },
});
