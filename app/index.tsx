import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
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
      return;
    }
    if (!password) {
      Alert.alert("senha nao pode ser vazia");
      return;
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
          router.replace("/tabs/home");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <ScrollView>
      <View className="max-h-screen max-w-screen">
        <View className="h-80">
          <Image
            source={require("../src/img/blue.jpg")}
            className="w-full h-full"
          />
        </View>
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
          <TouchableOpacity onPress={Touchables}>
            <Text className="border rounded-lg min-h-12 text-center py-2 bg-sky-400 text-lg text-white">
              Login
            </Text>
            <View></View>
          </TouchableOpacity>
          <View className="mx-3">
            <Text className="text-center text-2xl">
              Ainda nao tem uma conta?
            </Text>
            <Link href={"/register"} className="mx-6 underline text-2xl">
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
