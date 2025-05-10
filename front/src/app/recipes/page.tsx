'use client';

import ProtectedRoute from '../component/ProtectedRoute';
import { useEffect, useState } from 'react';
import api from '../lib/api'; // your Axios instance with auth header

interface Recipe {
  id: number;
  title: string;
  description: string;
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await api.get('/recipes/');
        setRecipes(res.data);
      } catch (err) {
        console.error('Failed to fetch recipes:', err);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">My Recipes</h1>
        <ul className="space-y-2">
          {recipes.map((r) => (
            <li key={r.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{r.title}</h2>
              <p className="text-sm">{r.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </ProtectedRoute>
  );
}
