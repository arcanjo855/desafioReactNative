import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";

interface InputProps {
  label: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  isPassword?: boolean;
  value: string;
  onChangeText?: ((text: string) => void) | undefined;
  maxLength?: number;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
}

export const Input = ({
  label,
  placeholder,
  keyboardType,
  isPassword,
  value,
  onChangeText,
  maxLength,
  autoCapitalize,
}: InputProps) => {
  const autoComplete = isPassword ? `password` : undefined;
  const secureTextEntry = !!isPassword;
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        placeholder={placeholder}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        style={{ paddingLeft: 18 }}
        className="border rounded-lg min-h-12"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};
