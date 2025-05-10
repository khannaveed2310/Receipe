"use client";
import api from "@/app/lib/api";
import { useRouter } from "next/navigation";

interface RecipeProps {
  id: number;
  title: string;
  description: string;
}

export default function RecipeCard({ id, title, description }: RecipeProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Delete this recipe?")) {
      await api.delete(`/recipes/${id}/`);
      router.refresh();
    }
  };

  return (
    <div className="border rounded p-4 space-y-2 shadow-sm">
      <h3 className="text-xl font-bold">{title}</h3>
      <p>{description}</p>
      <div className="flex space-x-2">
        <button
          onClick={() => router.push(`/recipes/${id}/edit`)}
          className="text-blue-600"
        >
          Edit
        </button>
        <button onClick={handleDelete} className="text-red-600">
          Delete
        </button>
      </div>
    </div>
  );
}
