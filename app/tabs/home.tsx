import React, { useState, useEffect } from "react";
import { Text, View, Alert, ScrollView, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

  useEffect(() => {
    Touchables();
  }, []);

  return (
    <ScrollView>
      <View>
        {data !== undefined ? (
          <View className="w-min-full h-min-full">
            <View className="flex justify-center items-center bg-sky-900 h-48 ">
              <View>
                <View className="flex items-center">
                  <Avatar
                    size={67}
                    rounded
                    title=""
                    containerStyle={{ backgroundColor: "#d3d3d3" }}
                  ></Avatar>
                  <Text className="text-white">{data.name}</Text>
                </View>
              </View>
            </View>

            <View className="bg-gray-400 my-9 mx-8 rounded-3xl">
              <View className="flex my-8 gap-5 mx-5">
                <Text className="text-white">Seus dados: </Text>
                <View>
                  <Text className="text-white">Email: {data.email}</Text>
                  <Text className="text-white">
                    Telefone: ({data.area_code}) {data.number}
                  </Text>
                  <Text className="text-white">
                    Conta crianda em: {data.created_at}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <>
            <ActivityIndicator
              className="flex items-center justify-center my-96"
              size="large"
              color="#38bdf8"
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default HomePage;
