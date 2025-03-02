import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
}

export const ButtonOpacity: React.FC<ButtonProps> = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      className="rounded-lg py-2 text-lg"
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3730a3",
        minHeight: 38,
        borderRadius: 15,
      }}
    >
      <Text className="text-white">{title}</Text>
    </TouchableOpacity>
  );
};
