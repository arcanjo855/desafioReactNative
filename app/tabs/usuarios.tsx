import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import axios from "axios";

interface User {
  name: string;
  id: number;
}

const UsuariosPage = () => {
  const [datas, setData] = useState<User[]>();

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
      <View className="p-50 mt-32 gap-10">
        <Text style={{ fontSize: 30, textAlign: "center" }}>
          Lista de usuarios
        </Text>

        <TouchableOpacity onPress={TouchablesOut}>
          <Text className="border rounded-lg min-h-12 text-center py-2 bg-sky-400 text-lg text-white">
            Monstar usuarios
          </Text>
        </TouchableOpacity>

        {datas !== undefined ? (
          <>
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
