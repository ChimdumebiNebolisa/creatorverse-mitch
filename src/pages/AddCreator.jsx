import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client.js';
import { formatSupabaseError } from '../utils/formatSupabaseError.js';

const initialState = {
  name: '',
  url: '',
  description: '',
  imageURL: '',
};

const AddCreator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    if (!formData.name.trim() || !formData.url.trim()) {
      setError('Please provide both a creator name and a valid profile link.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const payload = {
        name: formData.name.trim(),
        url: formData.url.trim(),
        description: formData.description.trim(),
        imageURL: formData.imageURL.trim(),
      };

      const { error: insertError } = await supabase.from('creators').insert([payload]);
      if (insertError) {
        throw insertError;
      }

      navigate('/');
    } catch (err) {
      console.error('Failed to add creator', err);
      setError(
        formatSupabaseError(
          err,
          'Unable to add creator right now. Please verify your connection and try again.'
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Add Creator</h1>
      </header>

      {error && <div className="alert alert--error">{error}</div>}

      <form className="form" onSubmit={handleSubmit}>
        <div className="form__section">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Creator name"
            required
          />
        </div>
        <div className="form__section">
          <label htmlFor="url">Profile URL</label>
          <input
            id="url"
            name="url"
            type="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://example.com/creator"
            required
          />
        </div>
        <div className="form__section">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us about this creator"
          />
        </div>
        <div className="form__section">
          <label htmlFor="imageURL">Image URL</label>
          <input
            id="imageURL"
            name="imageURL"
            type="url"
            value={formData.imageURL}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>
        <div className="form__actions">
          <button type="button" className="button button--secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="button" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Creator'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCreator;
