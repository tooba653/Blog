'use client';

import { useState } from 'react';
import Link from 'next/link';

const posts = [
  { id: 1, title: 'First Post', slug: 'first-post', content: 'This is the first post content. It will be displayed as a preview on the blog page.' },
  { id: 2, title: 'Second Post', slug: 'second-post', content: 'This is the second post content. It also has a preview that will be shown in the blog listing.' },
  { id: 3, title: 'Third Post', slug: 'third-post', content: 'This is the third post content, and it includes some details to give readers an idea of the post content.' },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setSearchQuery(e.target.value);
    setTimeout(() => {
      setLoading(false);
    }, 500); 
  };

 
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 text-center">Blog</h1>

      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      
      {loading && (
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
        </div>
      )}

      
      <ul>
        {filteredPosts.map((post) => (
          <li key={post.id} className="mb-4">
            <Link href={`/blog/${post.slug}`} passHref>
              <button className="w-full text-left bg-blue-100 hover:bg-blue-200 rounded-lg p-4 shadow-md">
                <h2 className="text-xl font-semibold text-blue-800">{post.title}</h2>
                <p className="text-gray-700 mt-2">{post.content.substring(0, 100)}...</p>
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
