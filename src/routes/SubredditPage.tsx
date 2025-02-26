import { useParams } from "react-router-dom";
import { api } from "../../convex/_generated/api";
import "../styles/SubredditPage.css";
import { useQuery } from "convex/react";
import PostCard from "../components/posts/PostCard";
const SubredditPage = () => {
  const { subredditName } = useParams();
  const getSubreddit = useQuery(api.queries.subreddit.get, {
    name: subredditName || "",
  });
  if (getSubreddit === undefined) {
    return <p>Loading...</p>;
  }
  if (!getSubreddit) {
    return (
      <div className="content-container">
        <div className="not-found">
          <h1>Subreddit Not found</h1>
          <p>The subreddit r/{getSubreddit} does not exist</p>
        </div>
      </div>
    );
  }
  return (
    <div className="content-container">
      <div className="subreddit-banner">
        <h1>r/{getSubreddit.name}</h1>
        {getSubreddit.description && <p>{getSubreddit.description}</p>}
      </div>
      <div className="posts-container">
        {getSubreddit.posts?.length === 0 ? (
          <div className="no-posts">
            <p>No posts yet. be first to post</p>
          </div>
        ) : (
          getSubreddit.posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))
        )}
      </div>
    </div>
  );
};
export default SubredditPage;
