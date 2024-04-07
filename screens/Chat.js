import React, { useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native";

export default function Chat() {
  const [messages, setMessages] = useState([]);

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) =>
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newMessages)
        )
      }
    />
  );
}
