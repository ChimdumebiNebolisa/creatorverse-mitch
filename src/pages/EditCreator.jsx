import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../client.js';

const initialState = {
  name: '',
  url: '',
  description: '',
  imageURL: '',
};

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!id) {
      setError('No creator id provided.');
      setLoading(false);
      return;
    }
    fetchCreator();
  }, [id]);

  async function fetchCreator() {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      setFormData({
        name: data.name ?? '',
        url: data.url ?? '',
        description: data.description ?? '',
        imageURL: data.imageURL ?? '',
      });
    } catch (err) {
      console.error('Failed to load creator for edit', err);
      setError('We could not load this creator. It may have been removed.');
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    navigate(-1);
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
      setSuccess(false);

      const updates = {
        name: formData.name.trim(),
        url: formData.url.trim(),
        description: formData.description.trim(),
        imageURL: formData.imageURL.trim(),
      };

      const { error: updateError } = await supabase
        .from('creators')
        .update(updates)
        .eq('id', id);

      if (updateError) {
        throw updateError;
      }

      setSuccess(true);
      navigate(`/creator/${id}`);
    } catch (err) {
      console.error('Failed to update creator', err);
      setError('Unable to update creator right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="empty-state">Loading creator...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Edit Creator</h1>
      </header>

      {error && <div className="alert alert--error">{error}</div>}
      {success && <div className="alert alert--success">Creator updated successfully.</div>}

      <form className="form" onSubmit={handleSubmit}>
        <div className="form__section">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
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
          />
        </div>
        <div className="form__actions">
          <button type="button" className="button button--secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="button" disabled={submitting}>
            {submitting ? 'Updating...' : 'Update Creator'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCreator;
