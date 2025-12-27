import { Text, View } from "react-native";
import Navbar from "./components/Navbar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  return (
    <View className="flex-1 bg-black">
      <Navbar />

      <View className="flex-1 items-center mt-10 ">
        <Text className=" text-[#d4af35]/30">
          <MaterialIcons name="castle" size={60} />
        </Text>
        <Text className="text-[#d4af35]/30 font-jb-regular mt-3">
          CONNECTING TO THE NEURAL LINK...
        </Text>
        <LinearGradient
          colors={["transparent", "rgba(184, 149, 37, 0.3)", "transparent"]}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ height: 1.5, width: 150, marginTop: 20 }}
        />
      </View>
    </View>
  );
}
