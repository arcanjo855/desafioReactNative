import React, { useState } from "react";
import { Text, View, Alert, Image, ScrollView } from "react-native";
import { Link, router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import "../global.css";
import { Input } from "@/components/Input";
import { ButtonOpacity } from "@/components/ButtonOpacity";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPssword] = useState("");

  const Touchables = () => {
    if (!email) {
      Alert.alert("email nao pode esta vazio");
      return;
    }
    if (!password) {
      Alert.alert("senha nao pode ser vazia");
      return;
    }

    axios
      .post("http://192.168.18.6:3000/login", {
        email,
        password,
      })
      .then(async function (response) {
        var token = response.data.token;
        await AsyncStorage.setItem("token", token);
        if (token) {
          router.replace("/tabs/home");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <ScrollView className="flex-1 bg-sky-400">
      <View className="flex justify-center items-center h-96">
        <Image className="w-48 h-48" source={require("../src/img/red.png")} />
      </View>
      <View className="min-h-full bg-white rounded-[18vw]">
        <View className="mt-6 flex mx-12 gap-5">
          <Text className="text-5xl text-center">Login</Text>
          <Input
            label="E-mail"
            placeholder="Digite seu email"
            keyboardType="email-address"
            value={email}
            onChangeText={(newText) => setEmail(newText)}
            autoCapitalize="none"
          />
          <Input
            label="Senha"
            placeholder="Digite sua senha"
            isPassword
            value={password}
            onChangeText={(newText) => setPssword(newText)}
            autoCapitalize="none"
          />
          <View>
            <ButtonOpacity onPress={Touchables} title="Login" />
          </View>
          <View className="mx-auto">
            <Text className="text-2xl">Ainda nao tem uma conta?</Text>
            <Link href={"/register"} className="underline text-2xl">
              Registrar-se
            </Link>
          </View>
          <View />
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginPage;
