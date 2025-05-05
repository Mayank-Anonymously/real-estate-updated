import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, Badge } from "react-native-paper";
import SearchBar from "./SearchBar";
import ChatCards from "../ScreensComponents/ChatScreen/ChatCards";

const ChatScreen = () => {
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <SearchBar />
        <ChatCards />
        <ChatCards />
        <ChatCards />
        <ChatCards />
      </SafeAreaView>
    </>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
