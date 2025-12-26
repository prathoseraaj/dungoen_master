import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Navbar = () => {
  return (
    <SafeAreaView>
      <View className="items-center py-2">
        <Text className="text-[#d4af35] font-jb-bold text-lg tracking-widest">
          DUNGEON
        </Text>
        <Text className="text-[#d4af35] font-jb-bold text-xs tracking-[4px]">
          TERMINAL
        </Text>
      </View>
      <View className="h-[1.5px] mt-5 bg-[#b89525]/30" />
    </SafeAreaView>
  );
};

export default Navbar;
