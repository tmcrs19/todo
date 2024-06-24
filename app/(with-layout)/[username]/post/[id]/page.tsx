import React from "react";
import Link from "next/link";

interface PostPageProps {
  params: {
    username: string;
    id: string;
  };
}

const fetchPost = async (postId: string) => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    return null;
  }
};

const PostPage: React.FC<PostPageProps> = async ({ params }) => {
  const { username, id } = params;
  const post = await fetchPost(id);

  if (!post) {
    return <p className="text-center">No such post exists</p>;
  }

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <div className="border border-gray-300 p-4 rounded-lg">
        <Link scroll={false} href="/" className="text-xl">
          &lt;
        </Link>
        <div className="flex flex-col items-center mt-4">
          <div
            aria-label={`Avatar of ${username}`}
            role="img"
            className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center text-3xl text-white"
          >
            {username[0]}
          </div>
          <p className="mt-2 text-xl font-bold">{username}</p>
        </div>
        <div className="border-t border-gray-300 mt-4 pt-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mt-2">{post.body}</p>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
