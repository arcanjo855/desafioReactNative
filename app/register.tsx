import React, { useState } from "react";
import { Text, TextInput, View, Button, Alert, ScrollView } from "react-native";
import { Link, router } from "expo-router";
import axios from "axios";

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
          Alert.alert("email ja cadastrado");
          return;
        }
        Alert.alert("erro ao cadastrar usuario");
      });
  };

  return (
    <ScrollView>
      <View style={{ padding: 50, gap: 10 }}>
        <Text style={{ fontSize: 50, textAlign: "center" }}>Registro</Text>
        <Text>nome</Text>
        <TextInput
          style={{ height: 40, padding: 5, borderWidth: 0.2 }}
          placeholder="Digite seu nome"
          onChangeText={(newText) => setName(newText)}
          defaultValue={name}
        />
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
        <Text>DDD</Text>
        <TextInput
          style={{ height: 40, padding: 5, borderWidth: 0.2 }}
          placeholder="Digite seu DDD"
          onChangeText={(newText) => setArea_code(newText)}
          defaultValue={area_code}
          keyboardType="numeric"
          maxLength={2}
        />
        <Text>Telefone</Text>
        <TextInput
          style={{ height: 40, padding: 5, borderWidth: 0.2 }}
          placeholder="Digite seu telefone"
          onChangeText={(newText) => setNumber(newText)}
          defaultValue={number}
          keyboardType="numeric"
          maxLength={9}
        />
        <Button title="Cadastrar" color="#6366f1" onPress={Touchables} />

        <Text style={{ fontSize: 20, marginLeft: 25 }}>Ja tem cadastrado?</Text>
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
    </ScrollView>
  );
};

export default RegisterPage;
