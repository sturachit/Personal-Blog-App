import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null); 
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null); // State to hold error messages

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8800/post/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const postInfo = await response.json();
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Error fetching post. Please try again.'); // Set error state
      }
    };

    fetchPost();
  }, [id]); // Add id to dependency array

  const updatePost = async (ev) => {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files[0]);
    }

    try {
      const response = await fetch(`http://localhost:8800/post/${id}`, {
        method: 'PUT',
        body: data,
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to update post');
      }
      setRedirect(true);
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Error updating post. Please try again.'); // Set error state
    }
  };

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={ev => setTitle(ev.target.value)}
        required // Adding required validation
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={ev => setSummary(ev.target.value)}
        required // Adding required validation
      />
      <input
        type="file"
        onChange={ev => setFiles(ev.target.files)} 
      />
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: '5px' }}>Update post</button>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error messages */}
    </form>
  );
}
