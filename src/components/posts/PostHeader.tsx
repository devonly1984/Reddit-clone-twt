import { Link } from "react-router-dom";

const PostHeader = ({
  author,
  subreddit,
  showSubreddit,
  creationTime,
}: PostHeaderProps) => {
  return (
    <header className="post-header">
      {author ? (
        <Link to={`/u/${author?.username}`}>u/{author.username}</Link>
      ) : (
        <span className="post-author">u/deleted</span>
      )}
      {showSubreddit && subreddit && (
        <>
          <span className="post-dot">-</span>
          <Link to={`/r/${subreddit}`} className="post-subreddit">
            r/{subreddit.name}
          </Link>
        </>
      )}
      <span className="post-dot">-</span>
      <span className="post-timestamp">
        {new Date(creationTime).toLocaleString()}
      </span>
    </header>
  );
};
export default PostHeader;
