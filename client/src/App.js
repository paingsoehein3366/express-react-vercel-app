import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';

function App() {
  const [data, setData] = useState({ email: "", password: "" });
  const loginFunction = async () => {
    const response = await fetch("http://localhost:5000/login", {
      method: "GET",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    });

    console.log("response :", await response.json());
    console.log("data :", data);
  }
  return (
    <div className="App">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input
          style={{
            width: 300,
            height: 40,
            margin: 3,
            padding: "5px 10px"
          }}
          placeholder="Email"
          onChange={(evt) => setData({ ...data, email: evt.target.value })}
        />
        <input
          type="password"
          style={{
            width: 300,
            height: 40,
            margin: 3,
            padding: "5px 10px"
          }}
          placeholder="Password"
          onChange={(evt) => setData({ ...data, password: evt.target.value })}
        />
        <button
          style={{
            width: 100,
            height: 50,
            background: "skyblue",
            borderRadius: 10,
            border: "none",
          }}
          onClick={loginFunction}
        >Login</button>
      </div>
    </div>
  );
}

export default App;
