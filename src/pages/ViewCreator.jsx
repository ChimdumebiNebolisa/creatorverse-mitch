import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../client.js';

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
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

      setCreator(data);
    } catch (err) {
      console.error('Failed to load creator', err);
      setError('We could not find this creator. It may have been removed.');
    } finally {
      setLoading(false);
    }
  }

  const goHome = () => navigate('/');

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">{creator?.name ?? 'Creator Details'}</h1>
        <div className="app__actions">
          <button type="button" className="button button--secondary" onClick={goHome}>
            Back to list
          </button>
          <button type="button" className="button" onClick={() => navigate(`/edit/${id}`)}>
            Edit Creator
          </button>
        </div>
      </header>

      {error && <div className="alert alert--error">{error}</div>}

      {loading ? (
        <div className="empty-state">Loading creator...</div>
      ) : !creator ? (
        <div className="empty-state">
          <p>This creator is no longer available.</p>
          <button type="button" className="button" onClick={goHome}>
            Add a new creator
          </button>
        </div>
      ) : (
        <article className="creator-detail">
          {creator.imageURL && (
            <img src={creator.imageURL} alt={creator.name} className="creator-detail__image" />
          )}
          <div className="creator-detail__content">
            <h2>{creator.name}</h2>
            <p>{creator.description}</p>
            {creator.url && (
              <a
                href={creator.url}
                target="_blank"
                rel="noreferrer noopener"
                className="button"
              >
                Visit channel
              </a>
            )}
          </div>
        </article>
      )}
    </div>
  );
};

export default ViewCreator;
