import { TbArrowBigDown, TbArrowBigUp } from "react-icons/tb";

const VoteButtons = ({
  voteCounts,
  hasDownVoted,
  hasUpVoted,
  onDownVote,
  onUpVote,
}: VoteButtonsProps) => {
  return (
    <div className="post-votes">
      <span className="vote-count upvote-count">
        {voteCounts?.upvotes ?? 0}
      </span>
      <button
        className={`vote-button ${hasUpVoted ? "voted" : ""}`}
        onClick={onUpVote}
      >
        <TbArrowBigUp size={24} />
      </button>
      <span className="vote-count total-count">{voteCounts?.total ?? 0}</span>
      <span className="vote-count downvote-count">
        {voteCounts?.downvotes ?? 0}
      </span>
      <button
        className={`vote-button ${hasDownVoted ? "voted" : ""}`}
        onClick={onDownVote}
      >
        <TbArrowBigDown size={24} />
      </button>
    </div>
  );
};
export default VoteButtons;
