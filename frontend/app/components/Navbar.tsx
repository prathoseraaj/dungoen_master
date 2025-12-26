import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Navbar = () => {
  return (
    <SafeAreaView>
      <View className=" items-center">
        <Text className="text-white">Navbar</Text>
      </View>
      <View className="h-[1.5px] mt-5 bg-[#b89525]" />
    </SafeAreaView>
  );
};

export default Navbar;
