import "../styles/SubmitPage.css";
import { useParams,useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { useMutation,useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {FaImage} from 'react-icons/fa'
import {IoMdClose} from 'react-icons/io'
const SubmitPage = () => {
  const { subredditName } = useParams();
  const navigate = useNavigate();
const getSubredditId = useQuery(api.queries.subreddit.get, {
  name: subredditName || "",
});
if (getSubredditId === undefined) {
  return <p>Loading...</p>;
}
if (!getSubredditId) {
  return (
    <div className="content-container">
      <div className="not-found">
        <h1>Subreddit Not found</h1>
        <p>The subreddit r/{getSubredditId} does not exist</p>
      </div>
    </div>
  );
}
const [title, setTitle] = useState("")
const [body, setBody] = useState("");
const [selectedImage, setselectedImage] = useState<File | null>(null);
const [imagePreview, setImagePreview] = useState<string|null>(null);
const [isSubmitting, setIsSubmitting] = useState(false);
const createPostMutation = useMutation(api.mutations.post.create);
const handleSubmit = async(e:FormEvent)=>{
  e.preventDefault();
  if (!title.trim() || !getSubredditId) {
    alert("Please enter a valid Subreddit to post to")
    return;
  }
  try {
    setIsSubmitting(true);
    await createPostMutation({
      subject: title.trim(),
      body: body.trim(),
      subreddit: getSubredditId._id,
    });
  } catch (error) {
    console.log(error);
    
  } finally{
setIsSubmitting(false);
  }
}
  return (
    <>
      <div className="content-container">
        <div className="submit-container">
          <h1 className="">Create a Post in r/{subredditName}</h1>
          <form className="submit-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="submit-title"
              maxLength={100}
            />
            {/**Iamge input */}
            <textarea
              placeholder="Text(optional)"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="submit-body"
            />
            <div className="submit-actions">
              <button
                type="button"
                onClick={() => navigate(`/r/${subredditName}`)}
                className="back-button"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting || !title.trim()}
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default SubmitPage;
