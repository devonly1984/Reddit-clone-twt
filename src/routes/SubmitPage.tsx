import "../styles/SubmitPage.css";
import { useParams,useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
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
const createPostMutation = useMutation(api.mutations.post.create);
const [selectedImage, setselectedImage] = useState<File | null>(null);
const [imagePreview, setImagePreview] = useState<string|null>(null);
const [isSubmitting, setIsSubmitting] = useState(false);
const [title, setTitle] = useState("")
const [body, setBody] = useState("");
const generateUploadUrl = useMutation(api.mutations.image.generateUploadUrl);
const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    if (file.size>5*1024*1024){
      alert("Size should be less 5MB")
      return;
    }
    setselectedImage(file);
    const reader = new FileReader();
    reader.onloadend=()=>{
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file);
  }


};
const handleRemoveImage = ()=>{
  setselectedImage(null);
  setImagePreview(null);
}
if (getSubredditId === undefined) {
  return <p>Loading...</p>;
}
if (!getSubredditId) {
  return (
    <>
    <div className="content-container">
      <div className="not-found">
        <h1>Subreddit Not found</h1>
        <p>The subreddit r/{getSubredditId} does not exist</p>
      </div>
    </div>
    </>
  );
}

const handleSubmit = async(e:FormEvent)=>{
  e.preventDefault();
  if (!title.trim() || !getSubredditId) {
    alert("Please enter a valid Subreddit to post to")
    return;
  }
  try {
    setIsSubmitting(true);
    let imageUrl = undefined
    if (selectedImage) {
      const uploadUrl = await generateUploadUrl();
      const result = await fetch(`${uploadUrl}`, {
        method: "Post",
        headers: { "Content-Type": selectedImage.type },
        body: selectedImage,
      });
      if (result.ok) throw new Error("Failed to upload image")
        const {storageId} =await result.json()
      imageUrl=storageId;
    }
    
    await createPostMutation({
      subject: title.trim(),
      body: body.trim(),
      subreddit: getSubredditId._id,
      storageId: imageUrl,
    });
    navigate(`/r/${subredditName}`)
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
            <div className="media-input-container">
              <label htmlFor="" className="image-upload-label">
                <FaImage className="image-icon" />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  style={{ display: "none" }}
                />
              </label>
              {imagePreview && (
                <div className="image-preview-container">
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="image-preview"
                  />
                  <button
                    type="button"
                    className="remove-image-button"
                    onClick={handleRemoveImage}
                  >
                    <IoMdClose />
                  </button>
                </div>
              )}
            </div>
            <textarea
              placeholder="Text (optional)"
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
