import React, { useState } from "react";
import { Text, View, Button, ScrollView } from "react-native";
import axios from "axios";

const UsuariosPage = () => {
  const [datas, setData] = useState([]);

  const TouchablesOut = async () => {
    await axios
      .get("http://10.2.3.59:3000/usuarios")
      .then(async function (response) {
        setData(response.data.users);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <ScrollView>
      <View style={{ padding: 50, marginTop: 100, gap: 10 }}>
        <Text style={{ fontSize: 30, textAlign: "center" }}>
          Lista de usuarios
        </Text>

        <Button title="buscar" color="#6366f1" onPress={TouchablesOut} />

        <View>
          {datas &&
            datas.map((data) => {
              return (
                <View
                  key={data.id}
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    borderColor: "black",
                    margin: 10,
                  }}
                >
                  <Text>ID: {data.id}</Text>
                  <Text>Nome: {data.name}</Text>
                </View>
              );
            })}
        </View>
      </View>
    </ScrollView>
  );
};

export default UsuariosPage;
