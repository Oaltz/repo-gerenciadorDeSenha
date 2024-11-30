import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./pages/home";
import Passwords from "./pages/passwords";
import { View, Text, ActivityIndicator } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function AuthenticationScreen({ onAuthenticate }) {
  useEffect(() => {
    const authenticate = async () => {
      try {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!hasHardware) {
          alert("Dispositivo não suporta autenticação biométrica.");
          onAuthenticate(false);
          return;
        }

        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (!isEnrolled) {
          alert(
            "Nenhuma biometria cadastrada. Cadastre uma nas configurações do dispositivo."
          );
          onAuthenticate(false);
          return;
        }

        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Confirme sua identidade",
          fallbackLabel: "Usar senha",
        });

        onAuthenticate(result.success);
      } catch (error) {
        console.error("Erro durante a autenticação:", error);
        onAuthenticate(false);
      }
    };

    authenticate();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Autenticando...</Text>
    </View>
  );
}

export function Routes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleAuthentication = (success) => {
    setIsAuthenticated(success);
    setLoading(false);
  };

  if (loading) {
    return <AuthenticationScreen onAuthenticate={handleAuthentication} />;
  }

  if (!isAuthenticated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Autenticação falhou. Reinicie o app para tentar novamente.</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return <Ionicons size={size} color={color} name="home" />;
            }
            return <Ionicons size={size} color={color} name="home-outline" />;
          },
        }}
      />

      <Tab.Screen
        name="Passwords"
        component={Passwords}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            if (focused) {
              return <Ionicons size={size} color={color} name="lock-closed" />;
            }
            return (
              <Ionicons size={size} color={color} name="lock-closed-outline" />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
