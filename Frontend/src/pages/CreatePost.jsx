import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();

    const formData = new FormData(e.target);

    axios.post(`${import.meta.env.VITE_API_URL}/createPost`, formData)
    .then(()=>{
      e.target.reset();
      navigate('/');
    })
    .catch((err)=>{
      console.error('Error creating post:', err);
      alert('Failed to create post.');
    });
  }

  return (
    <section className="form-page">
      <div className="page-heading">
        <p className="eyebrow">SHARE YOUR MOMENT</p>
        <h1>Create a new post</h1>
        <p className="subtitle">Turn a good moment into something worth sharing.</p>
      </div>

      <form className="post-form" onSubmit={handleSubmit}>
        <label className="field-label" htmlFor="post-image">Choose an image</label>
        <input className="file-input" id="post-image" name="image" type="file" accept="image/*" />
        <label className="field-label" htmlFor="caption">Caption</label>
        <textarea id="caption" name="caption" rows="5" placeholder="Write something about this moment..." required />
        <div className="form-actions">
          <span className="helper-text">Your post will be visible to everyone.</span>
          <button className="primary-button" type="submit">Publish post</button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
