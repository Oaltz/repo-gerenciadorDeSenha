import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  const getItem = async (key) => {
    try {
      const storedData = await AsyncStorage.getItem(key);
      return JSON.parse(storedData) || [];
    } catch (error) {
      console.error("Erro ao recuperar os dados:", error);
      return [];
    }
  };

  const saveItem = async (key, value) => {
    try {
      const passwords = await getItem(key);
      passwords.push(value);
      await AsyncStorage.setItem(key, JSON.stringify(passwords));
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  const removeItem = async (key, itemToRemove) => {
    try {
      const passwords = await getItem(key);
      const filteredPasswords = passwords.filter(
        (password) =>
          password.password !== itemToRemove.password ||
          password.comment !== itemToRemove.comment
      );
      await AsyncStorage.setItem(key, JSON.stringify(filteredPasswords));
      return filteredPasswords;
    } catch (error) {
      console.error("Erro ao remover:", error);
    }
  };

  return { getItem, saveItem, removeItem };
};

export default useStorage;
