import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new SockJS("http://192.168.29.141:8080/server");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected");
        stompClient.subscribe("/topic/public", (message) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            JSON.parse(message.body),
          ]);
          console.log(message.body);
        });

        // Send a message to the backend
        stompClient.send({
          destination: "/app/test",
          body: JSON.stringify({ message: "Hello from extension" }),
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Messages</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketComponent;
