import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import axios from "axios";
import { ButtonOpacity } from "@/components/ButtonOpacity";

interface User {
  name: string;
  id: number;
}

const UsuariosPage = () => {
  const [datas, setData] = useState<User[]>();

  const TouchablesOut = async () => {
    await axios
      .get("http://192.168.18.6:3000/usuarios")
      .then(async function (response) {
        setData(response.data.users);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <ScrollView>
      <View className="p-50 mt-32 gap-1">
        <Text style={{ fontSize: 30, textAlign: "center" }}>
          Lista de usuarios
        </Text>

        <View className="mx-8 my-7">
          <ButtonOpacity onPress={TouchablesOut} title="Mostrar usuarios" />
        </View>

        {datas !== undefined ? (
          <>
            {datas &&
              datas.map((data) => {
                return (
                  <View
                    className="mx-8"
                    key={data.id}
                    style={{
                      padding: 10,
                      margin: 10,
                      backgroundColor: "#9ca3af",
                      borderRadius: 18,
                      paddingTop: 10,
                    }}
                  >
                    <Text>Nome: {data.name}</Text>
                    <Text>ID: {data.id}</Text>
                  </View>
                );
              })}
          </>
        ) : (
          <></>
        )}

        <View></View>
      </View>
    </ScrollView>
  );
};

export default UsuariosPage;

// {
//   datas &&
//     datas.map((data) => {
//       return (
//         <View
//           key={data.id}
//           style={{
//             padding: 10,
//             borderWidth: 1,
//             borderColor: "black",
//             margin: 10,
//           }}
//         >
//           <Text>ID: {data.id}</Text>
//           <Text>Nome: {data.name}</Text>
//         </View>
//       );
//     });
// }
