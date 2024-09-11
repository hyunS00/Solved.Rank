import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Test from "../assets/svg/Test.svg";
import TierSvgDisplay from "../components/TierSvgDisplay";
import AddUserModal from "../components/AddUserModal";
import UserList from "../components/UserList";
import ModalOpenStore from "../store/ModalOpenStore";

function HomeScreen() {
  const { isModalOpen, closeAddUserModal } = ModalOpenStore();

  return (
    <View>
      <View>
        <UserList />
      </View>
      {isModalOpen && <AddUserModal setViewUserAdd={closeAddUserModal} />}
    </View>
  );
}

export default HomeScreen;
