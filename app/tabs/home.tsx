import React, { useState, useEffect } from "react";
import { Text, View, Alert, ScrollView, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ButtonOpacity } from "@/components/ButtonOpacity";
import { Avatar } from "@rneui/themed";

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
        "http://192.168.18.6:3000/userInfo",
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
      <View>
        {data !== undefined ? (
          <View className="w-min-full h-min-full">
            <View className="flex justify-center items-center bg-sky-400 h-48 ">
              <View>
                <View className="flex items-center">
                  <Avatar
                    size={67}
                    rounded
                    title="P"
                    containerStyle={{ backgroundColor: "#d3d3d3" }}
                  ></Avatar>
                  <Text className="text-white">{data.name}</Text>
                  <Text className="text-white">{data.email}</Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <>
            <ActivityIndicator size="large" color="#38bdf8" />
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default HomePage;
