import React, { useState } from "react";
import { Text, Image, View, Alert, ScrollView } from "react-native";
import { Link, router } from "expo-router";
import axios from "axios";
import { Input } from "@/components/Input";
import { ButtonOpacity } from "@/components/ButtonOpacity";

import "../global.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPssword] = useState("");
  const [area_code, setArea_code] = useState("");
  const [number, setNumber] = useState("");

  const Touchables = () => {
    if (!name) {
      Alert.alert("nome nao pode ser vazio");
      return;
    }
    if (!email) {
      Alert.alert("email nao pode ser vazio");
      return;
    }
    if (!password) {
      Alert.alert("senha nao pode ser vazia");
      return;
    }
    if (!area_code) {
      Alert.alert("DDD nao pode ser vazio");
      return;
    }
    if (!number) {
      Alert.alert("numero nao pode ser vazio");
      return;
    }
    axios
      .post("http://192.168.18.6:3000/register", {
        name,
        email,
        password,
        number,
        area_code,
      })
      .then((res) => {
        Alert.alert("usuario cadastrado");
        router.replace("/");
      })
      .catch((err) => {
        console.log(err);
        if (email) {
          Alert.alert("email invalido");
          return;
        }
        Alert.alert("erro ao cadastrar usuario");
      });
  };

  return (
    <ScrollView className="flex-1 bg-sky-400">
      <View className="flex justify-center items-center h-16">
        <Image source={require("../src/img/blue.jpg")} className="h-12 w-12" />
      </View>

      <View className="bg-white min-h-full rounded-[18vw] mt-6 flex p-12">
        <View className="gap-5">
          <Text style={{ fontSize: 50, textAlign: "center" }}>Registro</Text>
          <Input
            label="Nome"
            placeholder="Digite seu nome"
            keyboardType="default"
            value={name}
            onChangeText={(newText) => setName(newText)}
            autoCapitalize="none"
          />
          <Input
            label="Email"
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
          <Input
            label="DDD"
            placeholder="Digite seu DDD"
            value={area_code}
            onChangeText={(newText) => setArea_code(newText)}
            keyboardType="number-pad"
            maxLength={2}
          />
          <Input
            label="Telefone"
            placeholder="Digite seu telefone"
            value={number}
            onChangeText={(newText) => setNumber(newText)}
            keyboardType="number-pad"
            maxLength={9}
          />
          <View>
            <ButtonOpacity onPress={Touchables} title="Cadastrar" />
          </View>
          <View className="mx-auto">
            <Text className="text-2xl">Ja tem cadastrado?</Text>
            <Link href={"/"} className="underline text-2xl">
              Fazer Login
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterPage;
