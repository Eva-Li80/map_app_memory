// /app/page.tsx

"use client";
import styles from "./user.module.scss";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  addUser,
  removeUser,
  setUser,
  updateUser,
} from "../redux/feature/users/userSlice";
import Header from "@/components/Header";

interface User {
  id: number;
  name: string;
}

export default function Home() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => dispatch(setUser(data)))
      .catch((error) => console.error("Error fetching users:", error));
  }, [dispatch]);

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await fetch("/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        dispatch(removeUser(id));
      } else {
        console.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        const newUser = await response.json();
        dispatch(addUser(newUser));
        setName("");
      } else {
        console.error("Error creating user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleEditUser = (user: User) => {
    setEditId(user.id);
    setName(user.name);
  };

  const handleUpdateUser = async () => {
    if (editId === null) return;

    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: editId, name }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        dispatch(updateUser(updatedUser));
        setEditId(null);
        setName("");
      } else {
        console.error("Error updating user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <Header title="PekkaLi memory map app" url="/Eva-Li.jpg" />
      <div className={styles.user}>
        <h1>Users</h1>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={editId ? handleUpdateUser : handleAddUser}>
            {editId ? "Update" : "Add"} User
          </button>
          {editId && (
            <button
              onClick={() => {
                setEditId(null);
                setName("");
              }}
            >
              Cancel
            </button>
          )}
        </div>
        {users.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <button onClick={() => handleEditUser(user)}>Edit</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}
