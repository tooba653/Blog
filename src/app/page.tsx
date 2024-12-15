'use client';
import { useRouter } from 'next/navigation'; 

export default function HomePage() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/blog');
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Blog</h1>
      <button
        onClick={handleNavigate}
        className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition duration-200"
      >
        Go to Blog
      </button>
    </main>
  );
}
