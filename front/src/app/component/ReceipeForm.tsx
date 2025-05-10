'use client';
import { useState, useEffect } from 'react';


interface RecipeFormProps {
    initial?: {title: string; description: string; ingredients: string; instructions: string};
    onSubmit: (data: {title: string; description: string; ingredients: string ; instructions: string}) => void;
}

export default function RecipeForm({ initial, onSubmit}: RecipeFormProps) {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [ingredients, setIngredients] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');
    useEffect(() => {
        if (initial) {
            setTitle(initial.title);
            setDescription(initial.description);
        }
    }, [initial])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ title, description, ingredients, instructions });
    }

    return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="border p-2 w-full rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        className="border p-2 w-full rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <textarea
        className="border p-2 w-full rounded"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients"
        required
      />
      <textarea
        className="border p-2 w-full rounded"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Instructions"
        required
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}