import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Navbar from './Navbar';

const Chat = ({ user }) => {
  const userD = JSON.parse(localStorage.getItem('user'));
  const [messageInput, setMessageInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io.connect(process.env.REACT_APP_API);
    console.log('Socket connection established:', newSocket.connected);
    setSocket(newSocket);

    newSocket.on('chat_message', (message) => {
      console.log('Received message:', message); 
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on('active_users', (users) => {
      setActiveUsers(users);
    });

    // Authenticate the user on connection
    newSocket.emit('authenticate', userD.name);

    return () => newSocket.disconnect();
  }, [userD.name]);

  const handleSendMessage = () => {
    if (socket) {
      if (messageInput.trim() !== '') {
        const message = {
          username: userD.name,
          text: messageInput,
        };
        console.log(message)
        socket.emit('send_message', message);
        setMessageInput('');
      }
    } else {
      console.error('Socket not initialized');
    }
  };

  return (
    <div>
      <Navbar />
      <h2 className='txtcenter'>Welcome, {userD.name}!</h2>
      <div>
        <h3 className='txtcenter'>Chat Room</h3>
        <div className='chatbox'>
          {chatMessages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.username}:</strong> {msg.text}
            </div>
          ))}
        </div>

        <div className='txtcenter p'>
          <input
            type='text'
            placeholder='Type your message...'
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>

      <div className='txtcolor'>
        <h3>Active Users</h3>
        <ul>
          {activeUsers.map((user) => (
            <li key={user}>{user}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chat;
