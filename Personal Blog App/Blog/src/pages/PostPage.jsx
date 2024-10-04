import { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8800/post/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await response.json();
        setPostInfo(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!postInfo) return <div>Post not found.</div>;


  const handleEdit = () => {
    navigate(`/edit/${postInfo._id}`); 
  };

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className="author">by @{postInfo.author.username}</div>
  
      {userInfo && userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          <button className="edit-btn" onClick={handleEdit}>
            Edit this post
          </button>
          
        </div>
      )}
      
      <div className="image mt">
        <img src={`http://localhost:8800/${postInfo.cover}`} alt={postInfo.title} />
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
}
