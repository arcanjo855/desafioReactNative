import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Alert,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
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

  const HomePage = () => {
    AsyncStorage.removeItem("token");
    router.replace("/");
  };

  useEffect(() => {
    Touchables();
  }, []);

  return (
    <ScrollView>
      <View className="gap-5 flex m-auto py-40">
        {data !== undefined ? (
          <>
            <View className="flex justify-center items-center">
              <Text className="text-6xl text-center py-auto bg-sky-400 w-52 h-52 rounded-full">
                {data.name}
              </Text>
              <View>
                <Text>Email: {data.email}</Text>
                <Text>ID: {data.id}</Text>
                <Text>
                  Telefone: ({data.area_code}) {data.number}
                </Text>
                <Text>Criado em: {data.created_at}</Text>
                <Text>Modificado em: {data.modified_at}</Text>
              </View>
            </View>
          </>
        ) : (
          <>
            <ActivityIndicator size="large" color="#38bdf8" />
          </>
        )}
      </View>
      <View>
        <TouchableOpacity onPress={HomePage}>
          <Text className="border rounded-lg min-h-12 min-w-max text-center py-2 bg-sky-400 text-lg text-white">
            Sair
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomePage;
