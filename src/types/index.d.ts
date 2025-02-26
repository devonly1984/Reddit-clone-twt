interface Post {
    _id: Id<"post">;
    subject: string;
    body: string;
    _creationTime: number;
    authorId: string;
    imageUrl?: string;
    author?: {
      username: string;
    };
    subreddit?: {
      name: string;
    };
  }
  interface PostCardProps {
      post: Post;
      showSubreddit?:boolean;
      expandedView?:boolean;
  }
  interface PostHeaderProps {
      author?:{username:string};
      subreddit:{name:string};
      showSubreddit:boolean;
      creationTime:number;
  }
  interface PostContentProps {
      subject: string;
      body?:string;
      image?:string;
      expandedView:boolean;
  }
  interface CommentSectionProps {
    postId: Id<"post">;
    comments: Comment[];
    onSubmit: (content: string) => void;
    signedIn: boolean;
  }
  interface Comment {
    _id: Id<"comments">;
    _creationTime: number;
    authorId: Id<"users">;
    content: string;
    postId: Id<"post">;
  }
  interface CommentDisplayProps {
    comment: {
      _id: Id<"comments">;
      content: string;
      author?: {
        username?: string;
      };
      _creationTime: number;
    };
  }
  interface VoteButtonsProps {
    voteCounts:
      | { total: number; upVotes: number; downVotes: number }
      | undefined;
    hasUpVoted: boolean | undefined;
    hasDownVoted: boolean | undefined;
    onUpVote: () => void;
    onDownVote: () => void;
  }