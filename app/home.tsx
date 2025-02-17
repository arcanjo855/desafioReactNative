import React, {useState} from 'react';
import {Text, TextInput, View, Button, Alert, TouchableHighlight} from 'react-native';
import { Link } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



const HomePage = () => {
  
  const handleClick = () => {
    Alert.alert("a");
  };



  return (
    <View style={{padding: 50,marginTop: 100, gap: 10}}>
      <Text style={{fontSize: 50, textAlign: 'center'}}>Ver dados</Text>
      <Text></Text>
      <Button
              title="buscar"
              color="#6366f1"
              onPress={handleClick}
            />
    </View>
  );
};

export default HomePage;
