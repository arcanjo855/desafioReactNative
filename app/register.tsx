import React, { useState } from "react";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Link, router } from "expo-router";
import axios from "axios";
import { Input } from "@/components/Input";

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
      .post("http://10.2.3.59:3000/register", {
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
    <ScrollView>
      <View>
        <Image source={require("../src/img/blue.jpg")} className="h-32" />
        <View className="mx-8 p-6 gap-4">
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
          <TouchableOpacity onPress={Touchables}>
            <Text className="border rounded-lg min-h-12 text-center py-2 bg-sky-400 text-lg text-white">
              Cadastrar
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mx-16">
          <Text style={{ fontSize: 20, marginLeft: 25 }}>
            Ja tem cadastrado?
          </Text>
          <Link
            href={"/"}
            style={{
              fontSize: 20,
              marginLeft: 25,
              textDecorationLine: "underline",
              textDecorationColor: "#6366f1",
            }}
          >
            Fazer Login
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterPage;
