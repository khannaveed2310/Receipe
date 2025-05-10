"use client";
import { useRouter } from "next/navigation";
import api from "@/app/lib/api";
import RecipeForm from "../../component/ReceipeForm";
import { count } from "console";

export default function NewRecipe() {
  const router = useRouter();

  const createRecipe = async (data: {
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
  }) => {
    try {
      console.log("Payload", data);

      const token = localStorage.getItem("token"); // adjust if you're storing it differently

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      };

      const res = await fetch(
        "http://localhost:8000/api/create-recipe/",
        requestOptions
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Failed to create recipe.");
      }

      const result = await res.json();
      console.log("Recipe created:", result);
      router.push("/recipes");
    } catch (error: any) {
      console.error("Recipe creation error:", error.message);
      alert("Failed to create recipe. Please make sure you're logged in.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Add New Recipe</h2>
      <RecipeForm onSubmit={createRecipe} />
    </div>
  );
}
