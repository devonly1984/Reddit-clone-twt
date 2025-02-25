import { FormEvent, useState } from "react"
import "../../styles/CreateCommunityModal.css"
import { useMutation } from "convex/react"
import {api} from '../../../convex/_generated/api'
interface ModalProps {
  isOpen:boolean;
  onClose:()=>void;
}
const CreateCommunityModal = ({ isOpen, onClose }: ModalProps) => {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const createSubreddit = useMutation(api.mutations.subreddit.create);
  if (!isOpen){return null;}
  const handleSubmit = async(e:FormEvent)=>{
    e.preventDefault();
    setError("");
    if (!name) {
      setError("Community name is required")
      return;
    }
    if (name.length<3 || name.length >21){
      setError("Community name must be between 3 and 21 characters");
      return;
    }
    if (!/^[a-zA-z0-9_]+$/.test(name)) {
      setError("Community Name must contain letters, numbers or underscores.");
      return;

    }
    setIsLoading(true);

    await createSubreddit({
      name,
      description,
    })
      .then((res) => {
        console.log(res);
        onClose();
      })
      .catch((err) => {
        console.log(err.data.message);
        setError("Failed to create Community");
      })
      .finally(() => setIsLoading(false));

    
  }
  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-container">
        <div className="modal-header">
          <h2>Create a Community</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <div className="input-prefix">r/</div>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Community Name"
              maxLength={21}
              disabled={isLoading}
            />
            <p className="input-help">
              Community Names including capitalization cannot be changed
            </p>
          </div>
          <div className="form-group">
            <label htmlFor="description">
              Description <span>(optional)</span>
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about your community"
              maxLength={100}
              disabled={isLoading}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="modal-folder">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="create-button"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Community"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateCommunityModal