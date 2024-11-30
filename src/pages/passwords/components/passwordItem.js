import React, { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

export function PasswordItem({ data, removePassword }) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  async function handleCopyPassword() {
    if (isPasswordVisible) {
      await Clipboard.setStringAsync(data.password);
      Alert.alert("Sucesso", "Senha copiada para a área de transferência!");
    } else {
      Alert.alert("Erro", "Você precisa visualizar a senha antes de copiá-la.");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {/* Exibe o comentário, se existir */}
        {data.comment ? (
          <Text style={styles.comment} numberOfLines={1} ellipsizeMode="tail">
            {data.comment}
          </Text>
        ) : null}
        {/* Alterna entre mostrar a senha ou ocultá-la */}
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {isPasswordVisible ? data.password : "********"}
        </Text>
      </View>
      {/* Botão para copiar a senha */}
      <TouchableOpacity onPress={handleCopyPassword} style={styles.iconButton}>
        <Ionicons name="copy" size={24} color="#FFF" />
      </TouchableOpacity>
      {/* Botão para mostrar ou ocultar a senha */}
      <TouchableOpacity
        onPress={() => setPasswordVisible(!isPasswordVisible)}
        style={styles.iconButton}
      >
        <Ionicons
          name={isPasswordVisible ? "eye" : "eye-off"}
          size={24}
          color="#FFF"
        />
      </TouchableOpacity>
      {/* Botão para remover a senha */}
      <TouchableOpacity onPress={removePassword} style={styles.deleteButton}>
        <Ionicons name="close-circle" size={24} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0e0e0e",
    padding: 14,
    width: "100%",
    marginBottom: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
  comment: {
    color: "#ccc",
    fontSize: 12,
    marginBottom: 4,
  },
  iconButton: {
    padding: 5,
    marginRight: 10,
  },
  deleteButton: {
    padding: 5,
  },
});
