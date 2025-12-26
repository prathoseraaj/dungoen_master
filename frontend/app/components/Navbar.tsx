import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Navbar = () => {
  return (
    <SafeAreaView>
          <View className="mt-5 items-center">
      <Text className="text-white">Navbar</Text>
    </View>
    </SafeAreaView>

  );
};

export default Navbar;
