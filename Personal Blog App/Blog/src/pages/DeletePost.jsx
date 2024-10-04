import { useNavigate } from "react-router-dom";

export default function DeletePost({ _id, title, summary, content }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8800/post/${_id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete post');
        }

    
        alert('Post deleted successfully');
        navigate('/'); 
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{summary}</p>
      <button onClick={handleDelete}>Delete Post</button>
      
    </div>
  );
}
