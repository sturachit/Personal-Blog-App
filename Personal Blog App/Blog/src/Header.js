import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate(); // useNavigate to redirect after logout

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userInfo) return; // Exit if userInfo is not available

      try {
        const response = await fetch('http://localhost:8800/profile', {
          credentials: 'include', // Include credentials in the request
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserInfo(data); // Update user info based on response
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchProfile();
  }, [userInfo, setUserInfo]); // Add dependencies

  async function logout() {
    try {
      await fetch('http://localhost:8800/logout', {
        credentials: 'include',
        method: 'POST',
      });
      setUserInfo(null); // Clear user info after logout
      navigate('/'); // Redirect to home or login page
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username ? (
          <>
            <Link to="/create">Create new post</Link>
            <button onClick={logout}>Logout ({username})</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
