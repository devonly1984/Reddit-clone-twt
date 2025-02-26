const PostContent = ({
  subject,
  body,
  image,
  expandedView,
}: PostContentProps) => {
  return (
    <>
      {expandedView ? (
        <>
          <h1 className="post-title">{subject}</h1>
          {image && (
            <div className="post-image-container">
              <img src={image} alt="Post Content" className="post-image" />
            </div>
          )}
          {body && <p className="post-body">{body}</p>}
        </>
      ) : (
        <div className="preview-post">
          <div className="">
            <h2 className="post-title">{subject}</h2>
            {body && <p className="post-body">{body}</p>}
          </div>
          {image && (
            <div className="post-image-container small-img">
              <img src={image} alt="Post Content" className="post-image" />
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default PostContent;
