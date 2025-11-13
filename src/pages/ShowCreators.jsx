import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatorCard from '../components/CreatorCard.jsx';
import { supabase } from '../client.js';

const SAMPLE_CREATORS = [
  {
    name: 'Ava Streams',
    url: 'https://www.twitch.tv/avastreams',
    description: 'Variety gamer and community host sharing cozy playthroughs and indie spotlights each week.',
    imageURL: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Leo Sketch',
    url: 'https://www.youtube.com/@leosketch',
    description: 'Illustrator live-streaming digital art sessions, tutorials, and speedpaints focused on character design.',
    imageURL: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Harper Beats',
    url: 'https://www.youtube.com/@harperbeats',
    description: 'Bedroom producer releasing weekly lofi tracks, beat breakdowns, and behind-the-scenes studio vlogs.',
    imageURL: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Nia Bytes',
    url: 'https://www.instagram.com/niabytes/',
    description: 'Tech educator creating quick tips on coding, productivity, and building a human-centered developer workflow.',
    imageURL: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Kai Wander',
    url: 'https://www.youtube.com/@kaiwander',
    description: 'Travel storyteller sharing cinematic city guides, budget itineraries, and cultural deep dives from around the world.',
    imageURL: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  },
];

const ShowCreators = () => {
  const navigate = useNavigate();
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [error, setError] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  useEffect(() => {
    fetchCreators();
  }, []);

  async function fetchCreators({ allowSeed = true } = {}) {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('creators')
        .select('*')
        .order('id', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      if ((data ?? []).length === 0 && allowSeed) {
        await seedSampleCreators();
        return;
      }

      setCreators(data ?? []);
    } catch (err) {
      console.error('Failed to fetch creators', err);
      setError('We ran into an issue loading creators. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function seedSampleCreators() {
    try {
      setSeeding(true);
      setError(null);
      const { error: insertError } = await supabase.from('creators').insert(SAMPLE_CREATORS);
      if (insertError) {
        throw insertError;
      }
      await fetchCreators({ allowSeed: false });
    } catch (err) {
      console.error('Failed to seed sample creators', err);
      setError('Unable to seed sample creators. Add one manually to get started.');
    } finally {
      setSeeding(false);
    }
  }

  const handleView = (id) => {
    navigate(`/creator/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (pendingDeleteId === id) {
      return;
    }

    const confirmed = window.confirm('Delete this creator? This cannot be undone.');
    if (!confirmed) return;

    try {
      setPendingDeleteId(id);
      setError(null);

      const { error: deleteError } = await supabase.from('creators').delete().eq('id', id);
      if (deleteError) {
        throw deleteError;
      }

      setCreators((prev) => prev.filter((creator) => creator.id !== id));
    } catch (err) {
      console.error('Failed to delete creator', err);
      setError('We could not delete this creator. Please try again.');
    } finally {
      setPendingDeleteId(null);
    }
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Creatorverse</h1>
        <div className="app__actions">
          <button type="button" className="button" onClick={() => navigate('/add')}>
            Add Creator
          </button>
        </div>
      </header>

      {error && <div className="alert alert--error">{error}</div>}
      {seeding && <div className="alert alert--success">Loading sample creators...</div>}

      {loading ? (
        <div className="empty-state">Fetching creators...</div>
      ) : creators.length === 0 ? (
        <div className="empty-state">
          <p>No creators yet. Add your first creator to launch the creatorverse.</p>
        </div>
      ) : (
        <section className="creator-grid">
          {creators.map((creator) => (
            <CreatorCard
              key={creator.id}
              creator={creator}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={pendingDeleteId === creator.id}
            />
          ))}
        </section>
      )}
    </div>
  );
};

export default ShowCreators;
