'use client';

import { useEffect, useState } from 'react';

const posts = [
  { slug: 'first-post', title: 'First Post', content: 'This is the first blog post.' },
  { slug: 'second-post', title: 'Second Post', content: 'This is the second blog post.' },
  { slug: 'third-post', title: 'Third Post', content: 'This is the third blog post.' },
];

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string | null>(null);
  const [comments, setComments] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [post, setPost] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then((resolvedParams) => {
      const resolvedSlug = resolvedParams.slug;
      setSlug(resolvedSlug);

      
      const matchedPost = posts.find((p) => p.slug === resolvedSlug);
      setPost(matchedPost || null);
      setLoading(false);
    });
  }, [params]);

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments((prevComments) => [...prevComments, comment]);
      setComment(''); 
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (!slug || post === null) {
    return <div className="text-center text-lg">Post not found</div>;
  }

  return (
    <main className="p-6 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">{post.title}</h1>
      <p className="text-lg text-gray-800 mb-6">{post.content}</p>

      <section>
        <h2 className="text-2xl font-medium mb-4">Comments</h2>
        <ul className="mb-4">
          {comments.length > 0 ? (
            comments.map((cmt, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded mb-2">{cmt}</li>
            ))
          ) : (
            <li>No comments yet.</li> 
          )}
        </ul>

        <div className="flex gap-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment"
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={!comment.trim()}
          >
            Submit
          </button>
        </div>
      </section>
    </main>
  );
}
