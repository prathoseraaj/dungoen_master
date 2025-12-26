import { Text, View } from "react-native";
import Navbar from "./components/Navbar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function App() {
  return (
    <View className="flex-1 bg-black">
      <Navbar />

      <View className="flex-1 items-center mt-10 ">
        <Text className=" text-[#d4af35]/30">
          <MaterialIcons name="castle" size={60} />
        </Text>
      </View>
    </View>
  );
}
