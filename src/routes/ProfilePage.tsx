import "../styles/ProfilePage.css";
import { useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import PostCard from "../components/posts/PostCard";
const ProfilePage = () => {
  const {username} = useParams();
  const posts = useQuery(api.queries.post.getPostsByAuthor, {
    authorUsername: username||
  "skip"});
  const postCounts = useQuery(api.queries.users.getUserStats, {
    username: username || "",
  });
  if (posts===undefined) {
    return (
      <div className="content-container">
        <div className="profile-header">
          <h1>u/{username}</h1>
        </div>
        <div className="loading">Loading posts...</div>
      </div>
    );
  }
  return (
    <div className="content-container">
      <div className="profile-header">
        <h1>u/{username}</h1>
        <p style={{ color: "#7c7c7c" }}>Posts: {postCounts?.posts}</p>
      </div>
      <div className="posts-container">
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>no Posts Yet</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id} post={post} showSubreddit={true} />
          ))
        )}
      </div>
    </div>
  );
};
export default ProfilePage;
