import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
}

export const ButtonOpacity: React.FC<ButtonProps> = ({ onPress, title }) => {
  return (
    <TouchableOpacity
      className="border rounded-lg min-h-12 py-2 bg-sky-400 text-lg"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text className="text-white text-center text-xl">{title}</Text>
    </TouchableOpacity>
  );
};
