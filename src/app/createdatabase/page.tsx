"use client";
import React from "react";
import { toast } from "react-toastify";

const CreateDataBase = () => {
  const handleCreateDatabase = async () => {
    const response = await fetch("api/createdatabase", {
      method: "POST",
    });

    if (response.ok) {
      toast("Database created!");
    }
  };

  return (
    <div>
      <h1>CreateDataBase</h1>
      <button onClick={handleCreateDatabase}>Create database</button>
    </div>
  );
};

export default CreateDataBase;
