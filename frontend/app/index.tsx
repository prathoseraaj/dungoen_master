import { Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import Navbar from "./components/Navbar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  text: string;
  sender: "player" | "dm";
  diceRoll?: number;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [gameStatus, setGameStatus] = useState("not_started");
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    fetch("http://172.20.10.2:5000/start")
      .then((res) => res.json())
      .then((data) => {
        setMessages([
          {
            id: Date.now().toString(),
            text: data.story,
            sender: "dm",
          },
        ]);
        setGameStatus(data.game_status);
      })
      .catch((err) => console.error("Error starting game:", err));
  }, []);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "player",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    try {
      const response = await fetch("http://172.20.10.2:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();

      const dmMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.message,
        sender: "dm",
        diceRoll: data.dice_roll,
      };

      setMessages((prev) => [...prev, dmMessage]);
      setGameStatus(data.game_status);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <Navbar />

      <View className="items-center mt-10 pb-4">
        <Text className=" text-[#d4af35]/30">
          <MaterialIcons name="castle" size={60} />
        </Text>
        <Text className="text-[#d4af35]/30 font-jb-regular mt-3">
          SESSION ID: #8842-DELTA
        </Text>
        <LinearGradient
          colors={["transparent", "rgba(184, 149, 37, 0.3)", "transparent"]}
          locations={[0, 0.5, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ height: 1.5, width: 150, marginTop: 20 }}
        />
      </View>

      {/* Chat Window */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 px-4"
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message) => (
          <View key={message.id} className="mb-4">
            {message.sender === "dm" ? (
              <View>
                <View className="flex-row items-center mb-2">
                  <View className="w-12 h-12 rounded-lg bg-[#d4af35]/20 items-center justify-center mr-3">
                    <MaterialIcons name="castle" size={24} color="#d4af35" />
                  </View>
                  <Text className="text-[#d4af35] font-jb-medium text-sm">
                    DUNGEON MASTER
                  </Text>
                </View>
                <Text className="text-white/80 font-jb-regular text-base leading-6 ml-15">
                  {message.text}
                </Text>
                {message.diceRoll && (
                  <View className="mt-2 ml-15 bg-[#d4af35]/10 px-3 py-2 rounded self-start">
                    <Text className="text-[#d4af35] font-jb-medium text-xs">
                      System: Rolling Perception (D20)... {message.diceRoll}
                      {message.diceRoll >= 15 ? " [Success]" : message.diceRoll <= 10 ? " [Failure]" : ""}
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <View className="items-end">
                <View className="bg-[#d4af35]/20 px-4 py-3 rounded-lg max-w-[80%]">
                  <Text className="text-white font-jb-regular text-base italic">
                    {message.text}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Text Input Field */}
      <View className="px-4 pb-6 pt-4 border-t border-[#d4af35]/20">
        <View className="flex-row items-center bg-[#1a1a1a] rounded-lg px-4 py-3">
          <TextInput
            className="flex-1 text-white font-jb-regular text-base"
            placeholder="What do you do?"
            placeholderTextColor="#666"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={sendMessage}
            multiline
          />
          <TouchableOpacity onPress={sendMessage} className="ml-3">
            <MaterialIcons name="send" size={24} color="#d4af35" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
