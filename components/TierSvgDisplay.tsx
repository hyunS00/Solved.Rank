import React from "react";
import { View } from "react-native";

import Tier0 from "../assets/svg/tier0.svg";
import Tier1 from "../assets/svg/tier1.svg";
import Tier2 from "../assets/svg/tier2.svg";
import Tier3 from "../assets/svg/tier3.svg";
import Tier4 from "../assets/svg/tier4.svg";
import Tier5 from "../assets/svg/tier5.svg";
import Tier6 from "../assets/svg/tier6.svg";
import Tier7 from "../assets/svg/tier7.svg";
import Tier8 from "../assets/svg/tier8.svg";
import Tier9 from "../assets/svg/tier9.svg";
import Tier10 from "../assets/svg/tier10.svg";
import Tier11 from "../assets/svg/tier11.svg";
import Tier12 from "../assets/svg/tier12.svg";
import Tier13 from "../assets/svg/tier13.svg";
import Tier14 from "../assets/svg/tier14.svg";
import Tier15 from "../assets/svg/tier15.svg";
import Tier16 from "../assets/svg/tier16.svg";
import Tier17 from "../assets/svg/tier17.svg";
import Tier18 from "../assets/svg/tier18.svg";
import Tier19 from "../assets/svg/tier19.svg";
import Tier20 from "../assets/svg/tier20.svg";
import Tier21 from "../assets/svg/tier21.svg";
import Tier22 from "../assets/svg/tier22.svg";
import Tier23 from "../assets/svg/tier23.svg";
import Tier24 from "../assets/svg/tier24.svg";
import Tier25 from "../assets/svg/tier25.svg";
import Tier26 from "../assets/svg/tier26.svg";
import Tier27 from "../assets/svg/tier27.svg";
import Tier28 from "../assets/svg/tier28.svg";
import Tier29 from "../assets/svg/tier29.svg";
import Tier30 from "../assets/svg/tier30.svg";

const tierSvgs = [
  Tier0,
  Tier1,
  Tier2,
  Tier3,
  Tier4,
  Tier5,
  Tier6,
  Tier7,
  Tier8,
  Tier9,
  Tier10,
  Tier11,
  Tier12,
  Tier13,
  Tier14,
  Tier15,
  Tier16,
  Tier17,
  Tier18,
  Tier19,
  Tier20,
  Tier21,
  Tier22,
  Tier23,
  Tier24,
  Tier25,
  Tier26,
  Tier27,
  Tier28,
  Tier29,
  Tier30,
];

interface TierSvgDisplayProps {
  tier: number;
  width?: number;
  height?: number;
}

const TierSvgDisplay: React.FC<TierSvgDisplayProps> = ({
  tier,
  width = 100,
  height = 100,
}) => {
  const validTier = Math.max(0, Math.min(30, Math.floor(tier)));
  const SvgComponent = tierSvgs[validTier];

  return (
    <View style={{ width, height }}>
      <SvgComponent width="100%" height="100%" />
    </View>
  );
};

export default TierSvgDisplay;
