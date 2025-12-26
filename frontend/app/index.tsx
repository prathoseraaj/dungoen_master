import { Text, View } from "react-native";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <View className="flex-1 bg-black">
      <Navbar />

      <View className="flex-1 items-center justify-center">
        <Text className="text-xl font-bold text-blue-500">
          Welcome to NativeWind!
        </Text>
      </View>
    </View>
  );
}
