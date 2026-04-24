import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState("");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
  }, [token]);

  const getData = async () => {
    try {
      const res = await axios.get("/api/protected", {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      setData(JSON.stringify(res.data));
    } catch (err) {
      if (err.response && err.response.status === 401) {
         alert("Unauthorized! Redirecting to login...");
         sessionStorage.removeItem("token");
         window.location.href = "/";
      } else {
         setData("Error fetching data");
      }
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <button className="btn btn-success me-2" onClick={getData}>Fetch Data</button>
      <button className="btn btn-danger" onClick={logout}>Logout</button>
      <p className="mt-3">{data}</p>
    </div>
  );
}

export default Dashboard;
