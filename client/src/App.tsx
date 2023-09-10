import { useEffect, useState } from "react";
import "./App.css";
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:3001");

function App() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("room1");

  socket.on("connection", (data) => {
    console.log(data);
    setId(data);
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit("sendMessage", message, room); //third parameter is the room id I want to send the message to

    setMessage("");
  };

  const joinGroup = () => {
    socket.emit("joinGroup", room);
  };

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      console.log(message);
    });
  }, [socket]);

  return (
    <div className="mx-10 mt-3">
      <h2 className="text-7xl font-semibold">Hello World</h2>
      {id.trim().length && <p className="text-2xl text-blue-600">ID: {id}</p>}

      <form>
        <input
          type="text"
          className="border-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="border rounded-lg px-3 py-1"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </form>

      <button onClick={joinGroup}>Join Room</button>
    </div>
  );
}

export default App;
