import { FormEvent, useState } from "react"
import Comment from "./Comment";

const CommentSection = ({comments,onSubmit,signedIn}:CommentSectionProps) => {
    const [newComment, setNewComment] = useState("");
    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (!newComment.trim()) {
        return;
      }
      onSubmit(newComment.trim());
      setNewComment("");
    };
  return (
    <div className="comments-section">
      {signedIn && (
        <form className="comment-form" onSubmit={handleSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="What are your thoughts?"
            className="comment-input"
          />
          <button
            type="submit"
            className="comment-submit"
            disabled={!newComment}
          >
            Comment
          </button>
        </form>
      )}
      <div className="comment-list">
        {comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
export default CommentSection