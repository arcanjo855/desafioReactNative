import React, { useState } from "react";
import { Text, View, Button, Alert } from "react-native";
import { Link, router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import "../global.css";
import { Input } from "@/components/Input";

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
    <View className="my-auto mx-8 p-6 rounded-3xl gap-6">
      <Text className="text-5xl text-center">Login</Text>
      <Input
        label="E-mail"
        placeholder="Digite seu email"
        keyboardType="email-address"
        value={email}
        onChangeText={(newText) => setEmail(newText)}
      />
      <Input
        label="Senha"
        placeholder="Digite sua senha"
        isPassword
        value={password}
        onChangeText={(newText) => setPssword(newText)}
      />
      <Button title="login" color="#6366f1" onPress={Touchables} />

      <Text className="text-center text-2xl">Ainda nao tem uma conta?</Text>
      <Link href={"/register"} className="mx-6 underline text-2xl">
        Registrar-se
      </Link>
    </View>
  );
};

export default LoginPage;
