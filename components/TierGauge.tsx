import React from "react";
import { View, Text, StyleSheet } from "react-native";

const tiers = [
  {
    name: "Bronze",
    colors: ["#CD7F32", "#A0522D"],
    ranges: [0, 30, 60, 90, 120, 150],
  },
  {
    name: "Silver",
    colors: ["#C0C0C0", "#808080"],
    ranges: [200, 300, 400, 500, 650],
  },
  {
    name: "Gold",
    colors: ["#FFD700", "#DAA520"],
    ranges: [800, 950, 1100, 1250, 1400],
  },
  {
    name: "Platinum",
    colors: ["#E5E4E2", "#A0B2C6"],
    ranges: [1600, 1750, 1900, 2000, 2100],
  },
  {
    name: "Diamond",
    colors: ["#B9F2FF", "#4F94CD"],
    ranges: [2200, 2300, 2400, 2500, 2600],
  },
  {
    name: "Ruby",
    colors: ["#E0115F", "#900C3F"],
    ranges: [2700, 2800, 2850, 2900, 2950],
  },
  { name: "Master", colors: ["#FF00FF", "#8B008B"], ranges: [3000] },
];

const TierGauge = ({ score }) => {
  const getTier = (score) => {
    for (let i = 0; i < tiers.length; i++) {
      if (score <= tiers[i].ranges[tiers[i].ranges.length - 1]) {
        return tiers[i];
      }
    }
    return tiers[tiers.length - 1]; // Master tier
  };

  const getSubTier = (tier, score) => {
    for (let i = 0; i < tier.ranges.length; i++) {
      if (score <= tier.ranges[i]) {
        return tier.ranges.length - i;
      }
    }
    return 1; // Highest sub-tier
  };

  const calculatePercentage = (tier, score) => {
    const rangeIndex = tier.ranges.findIndex((r) => score <= r);
    const lowerBound = rangeIndex > 0 ? tier.ranges[rangeIndex - 1] : 0;
    const upperBound = tier.ranges[rangeIndex];
    return ((score - lowerBound) / (upperBound - lowerBound)) * 100;
  };

  const currentTier = getTier(score);
  const subTier = getSubTier(currentTier, score);
  const percentage = calculatePercentage(currentTier, score);

  return (
    <View style={styles.container}>
      <Text style={styles.tierText}>{`${currentTier.name} ${subTier}`}</Text>
      <View style={styles.gaugeContainer}>
        <View
          style={[
            styles.gauge,
            {
              width: `${percentage}%`,
              backgroundColor: currentTier.colors[0],
            },
          ]}
        />
      </View>
      <Text style={styles.scoreText}>{score}</Text>
      <Text style={styles.nextTierText}>
        {score < 3000
          ? `Next: ${
              currentTier.ranges[
                currentTier.ranges.findIndex((r) => score <= r)
              ]
            }`
          : "Max Tier"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  tierText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  gaugeContainer: {
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  gauge: {
    height: "100%",
  },
  scoreText: {
    fontSize: 16,
    marginTop: 5,
  },
  nextTierText: {
    fontSize: 14,
    color: "#666",
  },
});

export default TierGauge;
