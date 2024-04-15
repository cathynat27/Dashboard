import React, { useState, useEffect } from "react";
import PubNub from "pubnub";
import Navbar from "../Navbar/Index";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ChatFeature = () => {
  const [sidebarToggle] = useOutletContext();
  const publishKey = "pub-c-c9eab6f5-0232-4d25-88f2-8c6de320d091";
  const subscribeKey = "sub-c-547e7070-2c74-406e-834d-5fcdf72324ab";
  const { userNames } = useAuth();
  const userId = userNames;
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const pubnub = new PubNub({
    publishKey: publishKey,
    subscribeKey: subscribeKey,
    uuid: userId,
  });

  useEffect(() => {
    // Fetch channels when component mounts
    fetchChannels();

    // Subscribe to selected channel
    if (selectedChannel) {
      subscribeToChannel(selectedChannel);
    }

    // Load messages from local storage
    const storedMessages = localStorage.getItem(selectedChannel);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }

    // Clean up
    return () => {
      pubnub.unsubscribeAll();
    };
  }, [selectedChannel]);

  // Function to fetch channels
  const fetchChannels = () => {
    // Logic to fetch channels, maybe from an API or some other source
    const fetchedChannels = ["Mr Arafat", "Jane Doe", "Dr Smith"];
    setChannels(
      fetchedChannels.map((channel) => ({
        name: channel,
        count: getMessagesCount(channel),
      }))
    );
  };

  // Function to subscribe to a channel
  const subscribeToChannel = (channelName) => {
    pubnub.subscribe({
      channels: [`${userId}-${channelName}`],
      withPresence: true,
    });
  };

  // Function to get the count of messages for a channel
  const getMessagesCount = (channelName) => {
    const storedMessages = localStorage.getItem(channelName);
    return storedMessages ? JSON.parse(storedMessages).length : 0;
  };

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      console.log(
        "Publishing message to channel:",
        `${userId}-${selectedChannel}`
      );
      const newMessage = { user: userId, text: messageInput };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      const storedMessages = localStorage.getItem(selectedChannel);
      const updatedMessages = storedMessages
        ? [...JSON.parse(storedMessages), newMessage]
        : [newMessage];
      localStorage.setItem(selectedChannel, JSON.stringify(updatedMessages));

      // Publish message via PubNub
      pubnub.publish({
        channel: `${userId}-${selectedChannel}`,
        message: newMessage,
      });

      setMessageInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar toggle={sidebarToggle} />
      <div className="flex-grow flex">
        <div className="w-1/4 p-4 bg-gray-100">
          <h3 className="font-semibold text-lg mb-4">Channels</h3>
          <ul className="space-y-2">
            {channels.map((channel, index) => (
              <li
                key={index}
                onClick={() => setSelectedChannel(channel.name)}
                className={`cursor-pointer px-2 py-1 rounded ${
                  selectedChannel === channel.name ? "bg-blue-200" : ""
                }`}
              >
                {channel.name}{" "}
                <span className="text-red-500 px-1 text-base">
                ({channel.count})
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-grow p-4 bg-white">
          <h3 className="font-semibold text-lg mb-4">Messages</h3>
          {messages.map((message, index) => (
            <div key={index} className="mb-2 px-4 py-2 bg-gray-100 rounded-lg">
              <p className="m-0">{`${message.user}: ${message.text}`}</p>
            </div>
          ))}
          <div className="flex items-center mt-4">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 mr-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-blue-500"
            />
            <button
              onClick={sendMessage}
              className="hover:bg-blue-600 focus:outline-none bg-blue-500 text-white px-3 py-2 rounded-lg shadow-lg text-sm"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatFeature;
