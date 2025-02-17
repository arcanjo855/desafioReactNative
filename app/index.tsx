import React, {useState} from 'react';
import {Text, TextInput, View, Button, Alert, TouchableHighlight} from 'react-native';
import { Link } from 'expo-router';
import axios from 'axios';



const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPssword] = useState('');
  const [tokem, settokem] = useState('');
  
  const Touchables = () => {
    if(!email) {
      Alert.alert("email nao pode ser vazio");
    }
    if(!password) {
      Alert.alert("senha nao pode ser vazia");
    }
    
    axios.post("http://localhost:3000/login",{
      email,
      password
  }).then(res => {
      console.log(res)     
  }).catch(err => {
      alert(`login ou senha incorreta`)
  })
    };



  return (
    <View style={{padding: 50,marginTop: 100, gap: 10}}>
      <Text style={{fontSize: 50, textAlign: 'center'}}>Login</Text>
      <Text>Email</Text>
      <TextInput
        style={{height: 40, padding: 5, borderWidth: 0.2}}
        placeholder="Digite seu email"
        onChangeText={newText => setEmail(newText)}
        defaultValue={email}
      />
      <Text>Senha</Text>
      <TextInput
        style={{height: 40, padding: 5, borderWidth: 0.2}}
        placeholder="Digite sua senha"
        onChangeText={newText => setPssword(newText)}
        defaultValue={password}
        secureTextEntry={true}
      />
      <Button
        title="login"
        color="#6366f1"
        onPress={Touchables}
      />

      <Text style={{fontSize: 20, textAlign: 'center'}}>Ainda nao tem uma conta?</Text>
      <Link href={"/register"} style={{fontSize: 20, marginLeft: 25, textDecorationLine: 'underline', textDecorationColor: "#6366f1"}}>Registrar-se</Link>
     
    </View>
  );
};

export default LoginPage;
