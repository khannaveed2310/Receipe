'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';
import { setToken } from '../../lib/auth';


export default function LoginPage() {
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const router = useRouter();

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const res = await api.post('/login/', form);
            setToken(res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            router.push('/recipes/new');
        } catch (error) {
            alert('Login failed. Please try again.');
        }
    }

     return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['username', 'password'].map((field) => (
          <input
            key={field}
            type={field === 'password' ? 'password' : 'text'}
            name={field}
            placeholder={field}
            value={form[field as keyof typeof form]}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        ))}
        <button className="bg-green-500 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );

}
