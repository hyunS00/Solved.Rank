import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View } from "react-native";
import UserCard from "./UserCard";
import handlesStore from "../store/HandleStore";

function UserList() {
  const { handleList, loadHandleList } = handlesStore();
  useEffect(() => {
    console.log(handleList);
  }, [handleList]);
  return (
    <View>
      {handleList.map((v) => (
        <UserCard key={v} userHandle={v} />
      ))}
    </View>
  );
}

export default UserList;
