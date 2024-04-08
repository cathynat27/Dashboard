import React, { useState, useEffect } from 'react';
import PubNub from 'pubnub';

const ChatFeature = () => {
  // Replace with your own PubNub keys and user ID
  const publishKey = 'pub-c-c9eab6f5-0232-4d25-88f2-8c6de320d091';
  const subscribeKey = 'sub-c-547e7070-2c74-406e-834d-5fcdf72324ab';
  const userId = 'Dr Ibrahim';

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const pubnub = new PubNub({
    publishKey: publishKey,
    subscribeKey: subscribeKey,
    uuid: userId
  });

  useEffect(() => {
    pubnub.addListener({
      message: function (message) {
        const sender = message.publisher;
        appendMessage(sender, message.message.text);
      }
    });

    pubnub.subscribe({
      channels: ['Dr-Ibrahim-Mr Arafat'],
      withPresence: true
    });

    // Clean up
    return () => {
      pubnub.unsubscribeAll();
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      pubnub.publish({
        channel: 'Dr-Ibrahim-Mr Arafat',
        message: {
          user: userId,
          text: messageInput
        }
      });
      setMessageInput('');
    }
  };

  // Function to append messages to the messages container
  const appendMessage = (user, text) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { user: user, text: text }
    ]);
  };

  return (
    <div className="w-80 mx-auto border border-gray-300 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Dr. Ibrahim and Mr Arafat</h3>
      <div>
        {messages.map((message, index) => (
          <div key={index} className="mb-2 px-4 py-2 bg-gray-100 rounded-lg">
            <p className="m-0">{`${message.user}: ${message.text}`}</p>
          </div>
        ))}
      </div>
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
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatFeature;
