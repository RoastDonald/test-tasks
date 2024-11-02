import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { Colors } from "@/utils/colors";

const screenWidth = Dimensions.get("window").width;
const buttonSize = screenWidth / 4;

interface ButtonProps {
  title: string;
  type: "function" | "operator" | "number";
  onPress: () => void;
  doubleWidth?: boolean;
}

const Button = ({ title, type, onPress, doubleWidth = false }: ButtonProps) => {
  const backgroundColor =
    type === "operator" ? Colors.btnRight : Colors.btnLight;
  const textColor = type === "operator" ? Colors.white : Colors.black;
  const buttonWidth = doubleWidth ? buttonSize * 2 : buttonSize;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor,
          width: buttonWidth,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: buttonSize * 1.15,
    width: buttonSize,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.borderGray,
    marginRight: -StyleSheet.hairlineWidth,
    marginBottom: -StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 40,
    fontWeight: "300",
  },
});
