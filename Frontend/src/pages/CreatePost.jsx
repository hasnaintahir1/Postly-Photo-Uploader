import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CreatePost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    axios.post(`${import.meta.env.VITE_API_URL}/createPost`, formData)
      .then(() => {
        e.target.reset();
        navigate('/all-posts');
      })
      .catch((err) => {
        console.error('Error creating post:', err);
        const serverError = err.response?.data?.message || 'Failed to create post.';
        alert(serverError);
        setLoading(false);
      });
  }

  return (
    <section className="form-page">
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Publishing your post...</p>
        </div>
      )}
      <div className="page-heading">
        <p className="eyebrow">SHARE YOUR MOMENT</p>
        <h1>Create a new post</h1>
        <p className="subtitle">Turn a good moment into something worth sharing.</p>
      </div>

      <form className="post-form" onSubmit={handleSubmit}>
        <label className="field-label" htmlFor="post-image">Choose an image</label>
        <input 
          className="file-input" 
          id="post-image" 
          name="image" 
          type="file" 
          accept="image/*" 
          required 
        />
        <label className="field-label" htmlFor="caption">Caption</label>
        <textarea 
          id="caption" 
          name="caption" 
          rows="5" 
          placeholder="Write something about this moment..." 
          required 
        />
        <div className="form-actions">
          <span className="helper-text">Your post will be visible to everyone.</span>
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? 'Publishing...' : 'Publish post'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost