import React, { Dispatch, SetStateAction, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { COLORS } from "../../constants/COLORS";
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const activeColor = COLORS.RED;
const inActiveColor = COLORS.RED;
export default function Active_Button({
  toggle,
  setToggle,
}: {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <TouchableOpacity
      style={[styles.toggleContainer]}
      onPress={() => {
        LayoutAnimation.easeInEaseOut();
        setToggle(!toggle);
      }}
      activeOpacity={1}
    >
      <View
        style={[
          styles.toggleBtn,
          toggle
            ? { backgroundColor: activeColor, alignSelf: "flex-end" }
            : { backgroundColor: inActiveColor },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  status: {
    width: 50,
    marginBottom: 20,
    backgroundColor: "Red",
  },
  toggleContainer: {
    height: 10,
    width: 32,
    borderRadius: 5,
    backgroundColor: "#151515",
    justifyContent: "center",
  },
  toggleBtn: {
    height: 18,
    width: 18,
    borderRadius: 50,
  },
});
