import React from "react";
import ProfileCard from "./components/ProfileCard";

function App() {
  const person = {
    name: "Dhaman Preet",
    role: "AI & ML Undergraduate",
    description:
      "Computer Science student specializing in AI & ML with experience in Python, C, and web development.",
    location: "Chandigarh, India",
    email: "dhaman@example.com",
    image: "https://via.placeholder.com/150"
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <ProfileCard person={person} />
    </div>
  );
}

export default App;
