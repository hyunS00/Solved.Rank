import React, { useState, useCallback } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import handleStore from "../store/HandleStore";

type AddUserModalProps = {
  setViewUserAdd: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddUserModal({ setViewUserAdd }: AddUserModalProps) {
  const [userHandle, setUserHandle] = useState("");
  const { addHandleList } = handleStore();

  const onClickAddUser = useCallback(async () => {
    const success = await addHandleList(userHandle);
    if (success) {
      console.log("User handle added:", userHandle);
      setUserHandle("");
      setViewUserAdd(false);
    } else {
      console.log(
        "Failed to add user handle. It might be empty or already exists."
      );
      setUserHandle("");
      setViewUserAdd(false);
    }
  }, [userHandle, addHandleList, setViewUserAdd]);

  const onChangeUserHandle = useCallback((text: string) => {
    setUserHandle(text);
  }, []);

  return (
    <KeyboardAvoidingView>
      <Modal animationType="fade" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="유저 이름을 입력하세요"
              value={userHandle}
              onChangeText={onChangeUserHandle}
              style={styles.input}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onClickAddUser}
            >
              <Text style={styles.textStyle}>저장</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    width: "100%",
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
});

export default AddUserModal;
