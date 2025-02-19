import React, { useState } from "react";
import { Text, View, Button, Alert, ScrollView } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  name: string;
  id: number;
  email: string;
  area_code: number;
  number: number;
  created_at: string;
  modified_at: string;
}

const HomePage = () => {
  const [data, setData] = useState<User>();

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
      setData(response.data);
    } catch (error) {
      Alert.alert("Voce precisa estar logado para ver os dados");
      console.error(error);
    }
  };

  return (
    <ScrollView>
      <View style={{ padding: 50, marginTop: 100, gap: 10 }}>
        <Text style={{ fontSize: 50, textAlign: "center" }}>Ver dados</Text>
        <Button title="buscar" color="#6366f1" onPress={Touchables} />
        {data !== null ? (
          <>
            <Text>Email: {data?.email}</Text>
            <Text>ID: {data?.id}</Text>
            <Text>
              Telefone: ({data?.area_code}) {data?.number}
            </Text>
            <Text>Criado em: {data?.created_at}</Text>
            <Text>Modificado em: {data?.modified_at}</Text>
          </>
        ) : (
          <></>
        )}
      </View>
    </ScrollView>
  );
};

export default HomePage;
