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

    // Clean up
    return () => {
      pubnub.unsubscribeAll();
    };
  }, [selectedChannel]);

  // Function to fetch channels
  const fetchChannels = () => {
    // Logic to fetch channels, maybe from an API or some other source
    const fetchedChannels = ["Mr Arafat", "Jane Doe", "Dr Smith"];
    setChannels(fetchedChannels);
  };

  // Function to subscribe to a channel
  const subscribeToChannel = (channelName) => {
    pubnub.subscribe({
      channels: [`${userId}-${channelName}`],
      withPresence: true,
    });
  };

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      console.log("Publishing message to channel:", `${userId}-${selectedChannel}`);
      pubnub.publish({
        channel: `${userId}-${selectedChannel}`,
        message: {
          user: userId,
          text: messageInput,
        },
      });
      
      setMessageInput("");
    }
  };

  const appendMessage = (user, text) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: user, text: text },
    ]);
  };

  return (
    <div>
      <Navbar toggle={sidebarToggle} />
      <div className="mainCard">
        <div className="border border-gray-200 bg-white p-4 rounded-md">
          <h3 className="font-semibold text-2xl items-center text-sky-500 px-4 py-6">
            CHAT WITH USER{" "}
          </h3>
          <div className="flex">
            <div className="mr-4">
              <h4 className="font-semibold mb-2">Channels:</h4>
              <ul>
                {channels.map((channel, index) => (
                  <li key={index} onClick={() => setSelectedChannel(channel)} className={selectedChannel === channel ? "text-blue-500 cursor-pointer" : "cursor-pointer"}>
                    {channel}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Messages:</h4>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className="mb-2 px-4 py-2 bg-gray-100 rounded-lg"
                >
                  <p className="m-0">{`${message.user}: ${message.text}`}</p>
                </div>
              ))}
              <div className="flex items-center mt-4">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 mr-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:bg-white focus:border-sky-500"
                />
                <button
                  onClick={sendMessage}
                  className="hover:bg-sky-800 focus:outline-none bg-sky-600 text-gray-100 px-3 py-2 rounded-lg shadow-lg text-sm"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatFeature;
