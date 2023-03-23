import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState([]);
  const call = () => {
    fetch("http://localhost:8000", { method: "GET" })
      .then(async (d) => await d.json())
      .then((d) => {
        console.log(d);
        setUser(d);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => [call()], []);
  const add = () => {
    fetch("http://localhost:8000", { method: "POST" })
      .then(async (d) => await d.json())
      .then((d) => {
        call()
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      {user.map((x) => (
        <div key={x.id}>{x.firstName}</div>
      ))}
      <button onClick={add}>add</button>
    </div>
  );
}

export default App;
