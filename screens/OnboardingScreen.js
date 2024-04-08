import React from "react";
import { Image, ImageBackground } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

export default function OnboardingScreen({ navigation }) {
  return (
    <Onboarding
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: "black",
          image: (
            <ImageBackground
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Image source={require("../assets/bg.jpg")} />
            </ImageBackground>
          ),
          title: "Chattee",
          subtitle:
            "Learn about the complexities of addiction, its impact on individuals, families, and communities, and the journey to recovery.",
        },
        {
          backgroundColor: "orange",
          image: (
            <Image
              source={require("../assets/logo.png")}
              style={{ width: 200, height: 200, objectFit: "contain" }}
            />
          ),
          title: "Building a Support System",
          subtitle:
            "Discover the importance of support networks in overcoming addiction. Explore resources, connect with peers, and find encouragement on your path to recovery",
        },
        {
          backgroundColor: "orange",
          image: (
            <Image
              source={require("../assets/logo.png")}
              style={{ width: 200, height: 200, objectFit: "contain" }}
            />
          ),
          title: "Embracing Change",
          subtitle:
            "Explore strategies for embracing change and breaking free from the cycle of addiction. Find inspiration, motivation, and practical tips to reclaim control of your life.",
        },
      ]}
    />
  );
}
