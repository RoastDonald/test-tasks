import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/utils/colors";
import Button from "@/components/button";
import { useCalculator } from "@/hooks/useCalculator";

const Calculator = () => {
  const {
    displayValue,
    handleNumberInput,
    handleOperatorInput,
    handleEquals,
    handleClear,
    handleToggleSign,
    handleDecimal,
    handlePercentage,
  } = useCalculator();

  const buttons = [
    { title: "AC", type: "function" as const, onPress: handleClear },
    { title: "+/-", type: "function" as const, onPress: handleToggleSign },
    { title: "%", type: "function" as const, onPress: handlePercentage },
    {
      title: "÷",
      type: "operator" as const,
      onPress: () => handleOperatorInput("/"),
    },
    {
      title: "7",
      type: "number" as const,
      onPress: () => handleNumberInput("7"),
    },
    {
      title: "8",
      type: "number" as const,
      onPress: () => handleNumberInput("8"),
    },
    {
      title: "9",
      type: "number" as const,
      onPress: () => handleNumberInput("9"),
    },
    {
      title: "×",
      type: "operator" as const,
      onPress: () => handleOperatorInput("*"),
    },
    {
      title: "4",
      type: "number" as const,
      onPress: () => handleNumberInput("4"),
    },
    {
      title: "5",
      type: "number" as const,
      onPress: () => handleNumberInput("5"),
    },
    {
      title: "6",
      type: "number" as const,
      onPress: () => handleNumberInput("6"),
    },
    {
      title: "-",
      type: "operator" as const,
      onPress: () => handleOperatorInput("-"),
    },
    {
      title: "1",
      type: "number" as const,
      onPress: () => handleNumberInput("1"),
    },
    {
      title: "2",
      type: "number" as const,
      onPress: () => handleNumberInput("2"),
    },
    {
      title: "3",
      type: "number" as const,
      onPress: () => handleNumberInput("3"),
    },
    {
      title: "+",
      type: "operator" as const,
      onPress: () => handleOperatorInput("+"),
    },
    {
      title: "0",
      type: "number" as const,
      onPress: () => handleNumberInput("0"),
      doubleWidth: true,
    },
    { title: ".", type: "number" as const, onPress: handleDecimal },
    { title: "=", type: "operator" as const, onPress: handleEquals },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.text} adjustsFontSizeToFit numberOfLines={1}>
          {displayValue}
        </Text>
      </View>
      <View style={styles.keypad}>
        {buttons.map((button, index) => (
          <Button
            key={index}
            title={button.title}
            type={button.type}
            onPress={button.onPress}
            doubleWidth={button.doubleWidth}
          />
        ))}
      </View>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  display: {
    flex: 1,
    backgroundColor: Colors.black,
    padding: 30,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  text: {
    fontSize: 96,
    fontWeight: "200",
    color: Colors.white,
  },
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: Colors.black,
  },
});
