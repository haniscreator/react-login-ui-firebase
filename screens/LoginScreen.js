import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { ref, get } from "firebase/database";
import { database } from "../firebaseConfig";
import { Alert } from "react-native";
import { useState } from 'react';

import {
  View,
  Text,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

import Animated,{ 
    FadeInDown, 
    FadeInUp, 
} from 'react-native-reanimated';


export default function LoginScreen() {

  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const loginUser = async (username, password) => {
    try {
        const userRef = ref(database, `users/${username}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
        const user = snapshot.val();
        if (user.password === password) {
            Alert.alert("Login Success", `Welcome, ${user.username}!`);
        } else {
            Alert.alert("Login Failed", "Incorrect password");
        }
        } else {
        Alert.alert("Login Failed", "User not found");
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "Login error");
    }
    };



  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={require('../assets/images/background.png')}
        resizeMode="cover"
        style={styles.background}
      >
        {/* Overlay image on top of background */}
        <View>
            <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify()}
            source={require('../assets/images/light.png')}
            style={styles.overlayImage1}
            resizeMode="contain"
            />

            <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify()}
            source={require('../assets/images/light.png')}
            style={styles.overlayImage2}
            resizeMode="contain"
            />
        </View>

        {/* title and form */}
        <View className="flex items-center justify-start mt-[260px]">
            <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">
                Login 
            </Animated.Text>
        </View>

        {/* form */}
        <View className="items-center mx-4  mt-[150px]">
            <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput placeholder='Username' placeholderTextColor={'gray'} value={username} onChangeText={setUsername} />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full mt-4">
                <TextInput placeholder='Password' placeholderTextColor={'gray'} value={password} onChangeText={setPassword} secureTextEntry />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className="w-full">
                <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mt-8" onPress={() => loginUser(username, password)} >
                    <Text className="text-lg font-bold text-white text-center">Login</Text>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className="flex-row justify-center mt-6">
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={()=> navigation.push('SignUp')}>
                    <Text className="text-sky-600">
                        SignUp
                    </Text>
                </TouchableOpacity>
            </Animated.View>

        </View>
      </ImageBackground>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlayImage1: {
    position: 'absolute',
    top: 5,
    left: 55,
    width: 90,
    height: 225,
  },

  overlayImage2: {
    position: 'absolute',
    top: 5,
    left: 270,
    width: 65,
    height: 160,
  },
  
});
