import { FaRegCommentAlt, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import "../../styles/PostCard.css";
import { useState } from "react";
import {PostHeader,PostContent} from './'
import { CommentSection } from "../comments/";
import VoteButtons from "../votes/VoteButtons";

const PostCard = ({
  post,
  showSubreddit = false,
  expandedView = false,
}: PostCardProps) => {
  const [showComments, setShowComments] = useState(expandedView);
  const navigate = useNavigate();
  const { user } = useUser();
  const ownedByCurrentUser = post.author?.username === user?.username;
  const deletePostMutation = useMutation(api.mutations.post.deletePost)
  const comments = useQuery(api.queries.comments.getComments, {
    postId: post._id,
  });
  const commentCount = useQuery(api.queries.comments.getCommentCount, {
    postId: post._id,
  });
  const toggleUpVote = useMutation(api.helpers.vote.toggleUpVote); 
  const toggleDownVote = useMutation(api.helpers.vote.toggleDownVote)
  const voteCounts = useQuery(api.helpers.vote.getVoteCounts,{postId:post._id})
  const hasUpvoted = useQuery(api.helpers.vote.hasUpVoted,{postId:post._id})
  const hasDownVoted = useQuery(api.helpers.vote.hasDownVoted, {
    postId: post._id,
  });
  const createCommentMutation = useMutation(api.mutations.comments.create);
  const onUpVote = ()=>toggleUpVote({postId:post._id})
  const onDownVote = () => toggleDownVote({ postId: post._id });
  const handleComment = () => {
    if (!expandedView) {
      navigate(`/post/${post._id}`)
    } else {
      setShowComments(!showComments);
    }

  };
  const handleDelete = async () => {
    if (window.confirm("Are you sure you would like to delete this post?")){
      await deletePostMutation({id: post._id})
      if (expandedView) {
        navigate("/");
      }
    }
  };
  const handleSubmitComment = async(content: string) => {
    await createCommentMutation({
      content,
      postId: post._id,
    });
  };
  return (
    <div className={`post-card ${expandedView ? "expanded" : ""}`}>
      <VoteButtons
        onDownVote={user ? onDownVote : () => {}}
        onUpVote={user ? onUpVote : () => {}}
        voteCounts={voteCounts}
        hasUpVoted={hasUpvoted}
        hasDownVoted={hasDownVoted}
      />
      <div className="post-content">
        <PostHeader
          author={post.author}
          subreddit={post.subreddit ?? { name: "deleted" }}
          showSubreddit={showSubreddit}
          creationTime={post._creationTime}
        />
        <PostContent
          subject={post.subject}
          body={post.body}
          image={post.imageUrl}
          expandedView={expandedView}
        />
        <div className="post-actions">
          <button className="action-button" onClick={handleComment}>
            <FaRegCommentAlt />
            <span>{commentCount ?? 0} Comments</span>
          </button>
          {ownedByCurrentUser && (
            <button
              className="action-button delete-button"
              onClick={handleDelete}
            >
              <FaTrash />
              <span>Delete</span>
            </button>
          )}
        </div>
        {(showComments || expandedView) && (
          <CommentSection
            postId={post._id}
            comments={comments}
            onSubmit={handleSubmitComment}
            signedIn={!!user}
          />
        )}
      </div>
    </div>
  );
};
export default PostCard;