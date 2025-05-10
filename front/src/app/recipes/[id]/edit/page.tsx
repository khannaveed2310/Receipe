"use client";
import { use, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "../../../lib/api";
import RecipeForm from "../../../component/ReceipeForm";

export default function EditRecipe() {
  const router = useRouter();
  const { id } = useParams();
  const [recipe, setRecipe] = useState<{
    title: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    api.get(`/recipes/${id}/`).then((response) => setRecipe(response.data));
  }, [id]);

  const updateRecipe = async (data: { title: string; description: string }) => {
    await api.put(`/recipes/${id}/`, data);
    router.push("/recipes");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Edit Recipe</h2>
      {recipe && <RecipeForm initial={recipe} onSubmit={updateRecipe} />}
    </div>
  );
}
