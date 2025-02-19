import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";

interface InputProps {
  label: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  isPassword?: boolean;
  value: string;
  onChangeText?: ((text: string) => void) | undefined;
}

export const Input = ({
  label,
  placeholder,
  keyboardType,
  isPassword,
  value,
  onChangeText,
}: InputProps) => {
  const autoComplete = isPassword ? `password` : undefined;
  const secureTextEntry = !!isPassword;
  //   console.log(label, type, isPassword, secureTextEntry);
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        placeholder={placeholder}
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        className="border p-2 rounded-lg min-h-12"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        //   placeholder="Digite seu email"
        //   onChangeText={(newText) => setEmail(newText)}
        //   defaultValue={email}
        //   autoComplete="email"
        //   keyboardType="email-address"
      />
    </View>
  );
};
