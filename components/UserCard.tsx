import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import axios from "axios";
import handleStore from "../store/HandleStore";
import TierSvgDisplay from "./TierSvgDisplay";

const tierInfo = [
  { tier: 0, name: "Unrated", subTier: 0, requiredRating: 0 },
  { tier: 1, name: "Bronze", subTier: "V", requiredRating: 30 },
  { tier: 2, name: "Bronze", subTier: "IV", requiredRating: 60 },
  { tier: 3, name: "Bronze", subTier: "III", requiredRating: 90 },
  { tier: 4, name: "Bronze", subTier: "II", requiredRating: 120 },
  { tier: 5, name: "Bronze", subTier: "I", requiredRating: 150 },
  { tier: 6, name: "Silver", subTier: "V", requiredRating: 200 },
  { tier: 7, name: "Silver", subTier: "IV", requiredRating: 300 },
  { tier: 8, name: "Silver", subTier: "III", requiredRating: 400 },
  { tier: 9, name: "Silver", subTier: "II", requiredRating: 500 },
  { tier: 10, name: "Silver", subTier: "I", requiredRating: 650 },
  { tier: 11, name: "Gold", subTier: "V", requiredRating: 800 },
  { tier: 12, name: "Gold", subTier: "IV", requiredRating: 950 },
  { tier: 13, name: "Gold", subTier: "III", requiredRating: 1100 },
  { tier: 14, name: "Gold", subTier: "II", requiredRating: 1250 },
  { tier: 15, name: "Gold", subTier: "I", requiredRating: 1400 },
  { tier: 16, name: "Platinum", subTier: "V", requiredRating: 1600 },
  { tier: 17, name: "Platinum", subTier: "IV", requiredRating: 1750 },
  { tier: 18, name: "Platinum", subTier: "III", requiredRating: 1900 },
  { tier: 19, name: "Platinum", subTier: "II", requiredRating: 2000 },
  { tier: 20, name: "Platinum", subTier: "I", requiredRating: 2100 },
  { tier: 21, name: "Diamond", subTier: "V", requiredRating: 2200 },
  { tier: 22, name: "Diamond", subTier: "IV", requiredRating: 2300 },
  { tier: 23, name: "Diamond", subTier: "III", requiredRating: 2400 },
  { tier: 24, name: "Diamond", subTier: "II", requiredRating: 2500 },
  { tier: 25, name: "Diamond", subTier: "I", requiredRating: 2600 },
  { tier: 26, name: "Ruby", subTier: "V", requiredRating: 2700 },
  { tier: 27, name: "Ruby", subTier: "IV", requiredRating: 2800 },
  { tier: 28, name: "Ruby", subTier: "III", requiredRating: 2850 },
  { tier: 29, name: "Ruby", subTier: "II", requiredRating: 2900 },
  { tier: 30, name: "Ruby", subTier: "I", requiredRating: 2950 },
  { tier: 31, name: "Master", subTier: 0, requiredRating: 3000 },
];

function UserCard({ userHandle }) {
  const [user, setUser] = useState(null);
  const { removeHandleList } = handleStore();

  const loadUserData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `https://solved.ac/api/v3/user/show?handle=${userHandle}`,
        {
          headers: {
            Accept: "application/json",
            "x-solvedac-language": "ko",
          },
        }
      );
      setUser(data);
    } catch (error) {
      console.error("Failed to load user data:", error);
    }
  }, [userHandle]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const onClickRemove = useCallback(async () => {
    if (await removeHandleList(userHandle)) {
      console.log("Successfully removed user");
    } else {
      console.log("Failed to remove user");
    }
  }, [userHandle, removeHandleList]);

  if (!user) return null;

  const getTierInfo = (tier) => {
    return tierInfo.find((t) => t.tier === tier) || tierInfo[0];
  };

  const getNextTierRating = (tier) => {
    const nextTier = tierInfo.find((t) => t.tier === tier + 1);
    return nextTier ? nextTier.requiredRating : "Max";
  };

  const calculateProgress = (rating, tier) => {
    const currentTierInfo = getTierInfo(tier);
    const nextTierInfo = tierInfo.find((t) => t.tier === tier + 1);

    if (!nextTierInfo) return 100; // For Master tier

    const range = nextTierInfo.requiredRating - currentTierInfo.requiredRating;
    const progress = rating - currentTierInfo.requiredRating;

    return (progress / range) * 100;
  };

  const { name: tierName, subTier } = getTierInfo(user.tier);
  const { name: nextTierName, subTier: nextSubTier } = getTierInfo(
    user.tier + 1
  );
  const progress = calculateProgress(user.rating, user.tier);
  const nextTierRating = getNextTierRating(user.tier);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.profileImage}
          source={
            user.profileImageUrl
              ? { uri: user.profileImageUrl }
              : require("../assets/default_profile.png")
          }
        />
        <View style={styles.infoContainer}>
          <Text style={styles.username}>{user.handle}</Text>
          <Text style={styles.solvedCount}>{user.solvedCount}문제 완료</Text>
          <View style={styles.tierContainer}>
            <View style={styles.tierIconContainer}>
              <TierSvgDisplay tier={user.tier} width={50} height={50} />
              <Text style={styles.tierText}>{`${tierName} ${subTier}`}</Text>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{user.rating}</Text>
            <View style={styles.gaugeContainer}>
              <View style={[styles.gauge, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.nextTier}>
              <Text style={styles.nextTier}>
                {nextTierName}
                {nextSubTier}승급까지: {nextTierRating}
              </Text>
            </Text>
          </View>
          <Pressable style={styles.removeButton} onPress={onClickRemove}>
            <Text style={styles.removeButtonText}>X</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const getTierColor = (tierName) => {
  const colors = {
    Bronze: "#CD7F32",
    Silver: "#C0C0C0",
    Gold: "#FFD700",
    Platinum: "#E5E4E2",
    Diamond: "#B9F2FF",
    Ruby: "#E0115F",
    Master: "#FF00FF",
  };
  return colors[tierName] || "#000000";
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
  },
  solvedCount: {
    fontSize: 14,
    color: "#666",
  },
  tierContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  tierBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  tierSubTier: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  tierName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 5,
  },
  gaugeContainer: {
    flex: 1,
    height: 6,
    backgroundColor: "#ddd",
    borderRadius: 3,
    overflow: "hidden",
  },
  gauge: {
    height: "100%",
    backgroundColor: "#FFD700",
  },
  nextTier: {
    fontSize: 12,
    color: "#666",
    marginLeft: 5,
  },
  removeButton: {
    padding: 5,
  },
  removeButtonText: {
    fontSize: 18,
    color: "red",
  },
});

export default UserCard;
