import { useEffect, useState } from "react";
import "./App.css";
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:3001");

function App() {
  const [id, setId] = useState("wefe");

  useEffect(() => {
    fetch("http://localhost:3001")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div className="mx-10 mt-3">
      <h2 className="text-7xl font-semibold">Hello World</h2>
      {id.trim() && <p className="text-2xl text-blue-600">ID: {id}</p>}
    </div>
  );
}

export default App;
