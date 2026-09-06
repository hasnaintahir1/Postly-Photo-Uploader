import { useState, useEffect } from 'react';
import axios from 'axios';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const handleDeletePost = () => {
    axios.delete(`${import.meta.env.VITE_API_URL}/posts/${postToDelete}`)
      .then(() => {
        setPosts(posts.filter((post) => post._id !== postToDelete));
        setShowDeletePopup(false);
      })
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/posts`)
      .then((res) => {
        setPosts(res.data.posts)
      })
  }, []);

  return (
    <section className="posts-page">
      <div className="page-heading posts-heading">
        <div>
          <p className="eyebrow">COMMUNITY FEED</p>
          <h1>All posts</h1>
          <p className="subtitle">See what everyone is sharing today.</p>
        </div>
        <span className="post-count">{posts.length} posts</span>
      </div>

      {posts.length === 0 ? (
        <div className="empty-posts">
          <div className="empty-posts-icon">✦</div>
          <h2>You have no posts yet</h2>
          <p>Share your first moment and it will appear here</p>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <article className="post-card" key={post._id}>
              <img className="post-image" src={post.image} alt={post.caption} />
              <div className="post-body">
                <p className="post-caption">{post.caption}</p>
                <div className="post-actions">
                  <button type="button" aria-label="Like post">♡ <span>Like</span></button>
                  <button type="button" aria-label="Comment on post">○ <span>Comment</span></button>
                  <button
                    className="delete-button"
                    type="button"
                    aria-label="Delete post"
                    onClick={() => {
                      setPostToDelete(post._id);
                      setShowDeletePopup(true);
                    }}
                  >
                    🗑 <span >Delete</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {showDeletePopup && (
        <div className="delete-popup-background">
          <div className="delete-popup">
            <h2>Delete post?</h2>
            <p>You want to delete this post?</p>
            <div className="delete-popup-buttons">
              <button
                className="cancel-button"
                type="button"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>
              <button className="confirm-delete-button" type="button"
                onClick={handleDeletePost}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default AllPosts
