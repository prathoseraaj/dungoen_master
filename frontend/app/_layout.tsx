import "./global.css";
import { Stack } from "expo-router";
import {
  useFonts,
  JetBrainsMono_400Regular,
  JetBrainsMono_700Bold,
} from "@expo-google-fonts/jetbrains-mono";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "JetBrainsMono-Regular": JetBrainsMono_400Regular,
    "JetBrainsMono-Bold": JetBrainsMono_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
