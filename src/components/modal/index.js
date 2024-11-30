import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import useStorage from "../../hooks/useStorage";
import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";

export function ModalPassword({ handleClose, password }) {
  const { saveItem } = useStorage();
  const [comment, setComment] = useState("");

  async function handleSavePassword() {
    if (!comment.trim()) {
      Alert.alert("Erro", "Por favor, insira um comentário antes de salvar.");
      return;
    }

    const dataToSave = { password, comment };
    await saveItem("@pass", dataToSave);
    Alert.alert("Sucesso", "Senha e comentário salvos com sucesso!");
    handleClose();
  }

  async function handleCopyPassword() {
    await Clipboard.setStringAsync(password);
    Alert.alert("Sucesso", "Senha copiada para a área de transferência!");
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Senha Gerada</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome da senha"
          placeholderTextColor="#aaa"
          value={comment}
          onChangeText={setComment}
        />

        <View style={styles.innerPassword}>
          <Text style={styles.text} onLongPress={handleCopyPassword}>
            {password}
          </Text>
        </View>

        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={styles.buttonExit}>Fechar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={handleSavePassword}
          >
            <Text style={styles.buttonSaveText}>Salvar senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(24, 24, 24, 0.7)",
  },
  content: {
    width: "85%",
    backgroundColor: "#FFF",
    paddingTop: 24,
    paddingBottom: 24,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 24,
    fontWeight: "bold",
    color: "#000",
  },
  innerPassword: {
    width: "90%",
    padding: 14,
    backgroundColor: "#0e0e0e",
    borderRadius: 8,
    marginBottom: 14,
  },
  text: {
    color: "#FFF",
    textAlign: "center",
  },
  input: {
    width: "90%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 14,
    color: "#000",
  },
  buttonArea: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginTop: 14,
    marginBottom: 14,
    padding: 8,
  },
  buttonSave: {
    backgroundColor: "#392de9",
    borderRadius: 8,
  },
  buttonSaveText: {
    color: "#FFF",
    fontSize: 16,
  },
});
