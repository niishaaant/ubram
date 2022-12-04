import React, { useState } from "react";

const Selling = () => {
  const [mode, setMode] = useState("deploy");
  return (
    <div>
      <div>
        <button
          onClick={() => {
            setMode("deploy");
          }}
        >
          Add product
        </button>
        <button
          onClick={() => {
            setMode("dashboard");
          }}
        >
          Dashboard
        </button>
      </div>
      {mode === "deploy" ? <Deploy /> : <Dashboard />}
    </div>
  );
};

const Deploy = () => (
  <div>
    <h1>Deploy</h1>
    <button>Upload Image</button>
    <input type="text" placeholder="name" />
    <input type="number" placeholder="supply" />
    <input type="text" placeholder="name" />
  </div>
);

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <button>Upload Image</button>
    <input type="text" placeholder="name" />
    <input type="number" placeholder="supply" />
    <input type="text" placeholder="name" />
  </div>
);

export default Selling;
