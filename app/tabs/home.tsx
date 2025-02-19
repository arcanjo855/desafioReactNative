import React, { useState } from "react";
import { Text, TextInput, View, Button, Alert, ScrollView } from "react-native";
import { Link, router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [area_code, setArea_code] = useState("");
  const [number, setNumber] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [modified_at, setModified_at] = useState("");
  const [data, setData] = useState(null);

  const Touchables = async () => {
    try {
      const axiosConfig = {
        headers: {
          Authorization: "Bearer " + (await AsyncStorage.getItem("token")),
        },
      };

      const response = await axios.get(
        "http://10.2.3.59:3000/userInfo",
        axiosConfig,
      );
      setEmail(`Email:  ` + response.data.email);
      setId(`Id:  ` + response.data.id);
      setNumber(response.data.number);
      setArea_code(`Telefone:  ` + response.data.area_code);
      setCreated_at(`Criado em:  ` + response.data.created_at);
      setModified_at(`Modificado em:  ` + response.data.modified_at);
    } catch (error) {
      Alert.alert("Voce precisa estar logado para ver os dados");
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <View style={{ padding: 50, marginTop: 100, gap: 10 }}>
        <Text style={{ fontSize: 50, textAlign: "center" }}>Ver dados</Text>
        {data !== null ? (
          <>
            <Text>{email}</Text>
            <Text>{id}</Text>
            <Text>
              {area_code} {number}
            </Text>
            <Text>{created_at}</Text>
            <Text>{modified_at}</Text>
          </>
        ) : (
          <Button title="buscar" color="#6366f1" onPress={Touchables} />
        )}
      </View>
    </ScrollView>
  );
};

export default HomePage;
