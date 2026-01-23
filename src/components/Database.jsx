"use client";

import { useState } from "react";
import DatabaseStyle from "./Database.module.css";

export default function Homepage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const response = await fetch(
      "https://uncluttr-server.onrender.com/new-user",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      },
    );

    const data = await response.json();

    //add in if statements to show message that user already exists
    if (data.request === "fail") {
      setError("You're already part of Uncluttr! Happy to have you here.");
    } else {
      setSuccess("Welcome to Uncluttr Community!");
    }
  };

  return (
    <>
      <div className={DatabaseStyle.wrapper}>
        <h2 className={DatabaseStyle.h2}>
          Enter your username to see if you are already part of Uncluttr. If you
          are new here, you will be added to our database and can enjoy Uncluttr
          for free!
        </h2>

        <form className={DatabaseStyle.database} onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              className={DatabaseStyle.input}
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <button className={DatabaseStyle.button} type="submit">
            Uncluttr
          </button>
        </form>

        {error && <p>{error}</p>}
        {success && <p>{success}</p>}
      </div>
    </>
  );
}
