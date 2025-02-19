import React, { useState } from "react";
import { Text, TextInput, View, Button, Alert } from "react-native";
import { Link, router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPssword] = useState("");

  const Touchables = () => {
    if (!email) {
      Alert.alert("email nao pode esta vazio");
    }
    if (!password) {
      Alert.alert("senha nao pode ser vazia");
    }

    axios
      .post("http://10.2.3.59:3000/login", {
        email,
        password,
      })
      .then(async function (response) {
        var token = response.data.token;
        await AsyncStorage.setItem("token", token);
        if (token) {
          Alert.alert("logado");
          router.replace("/tabs/home");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={{ padding: 50, marginTop: 100, gap: 10 }}>
      <Text style={{ fontSize: 50, textAlign: "center" }}>Login</Text>
      <Text>Email</Text>
      <TextInput
        style={{ height: 40, padding: 5, borderWidth: 0.2 }}
        placeholder="Digite seu email"
        onChangeText={(newText) => setEmail(newText)}
        defaultValue={email}
        autoComplete="email"
        keyboardType="email-address"
      />
      <Text>Senha</Text>
      <TextInput
        style={{ height: 40, padding: 5, borderWidth: 0.2 }}
        placeholder="Digite sua senha"
        onChangeText={(newText) => setPssword(newText)}
        defaultValue={password}
        secureTextEntry={true}
      />
      <Button title="login" color="#6366f1" onPress={Touchables} />

      <Text style={{ fontSize: 20, textAlign: "center" }}>
        Ainda nao tem uma conta?
      </Text>
      <Link
        href={"/register"}
        style={{
          fontSize: 20,
          marginLeft: 25,
          textDecorationLine: "underline",
          textDecorationColor: "#6366f1",
        }}
      >
        Registrar-se
      </Link>
    </View>
  );
};

export default LoginPage;
