"use client";

import { useState } from "react";
import api from "../../lib/api";
import { useRouter } from "next/navigation";
import axios from "axios";

const commonPasswords = [
  "123456",
  "password",
  "123456789",
  "12345",
  "12345678",
  "qwerty",
  "abc123",
  "password1",
  "123123",
  "letmein",
];

export default function RegisterPage() {
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const router = useRouter();

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   // console.log("Form submitted");
  //   try {

  //     // console.log("Form data:", form);

  //     await api.post("/register/", form);
  //     console.log("Registration successful",);
  //     router.push("/login");
  //   } catch (error: any) {
  //     console.error("Registration error:", error?.response?.data || error.message);
  //     alert("Registration failed. Please try again.");
  //   }
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (commonPasswords.includes(form.password.toLowerCase())) {
      setPasswordError(
        "This password is too common. Please choose a stronger password."
      );
      return;
    }
    try {
      await axios.post("http://localhost:8000/api/register/", form, {
        withCredentials: true, // optional if you plan to use cookies later
      });
      console.log("Registration successful", form);
      router.push("/auth/login");
    } catch (error: any) {
      console.error(
        "Registration error:",
        error?.response?.data || error.message
      );
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["username", "email", "password", "password2"].map((field) => (
          <div key={field}>
            <input
              type={field.includes("password") ? "password" : "text"}
              name={field}
              placeholder={field}
              value={form[field as keyof typeof form]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {field === "password" && passwordError && (
              <div className="text-red-500 text-sm mt-2">{passwordError}</div>
            )}
          </div>
        ))}
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
