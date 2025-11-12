const CreatorCard = ({ creator, onView, onEdit, onDelete, isDeleting = false }) => {
  if (!creator) return null;

  const { id, name, url, description, imageURL } = creator;

  const handleView = () => {
    if (onView) {
      onView(id);
    }
  };

  const handleKeyDown = (event) => {
    if (!onView) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onView(id);
    }
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    if (onEdit) {
      onEdit(id);
    }
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    if (isDeleting) return;
    if (onDelete) {
      onDelete(id);
    }
  };

  const interactiveProps = onView
    ? {
        onClick: handleView,
        onKeyDown: handleKeyDown,
        role: 'button',
        tabIndex: 0,
      }
    : {};

  return (
    <article className="creator-card" {...interactiveProps}>
      {imageURL ? (
        <img src={imageURL} alt={name} className="creator-card__image" />
      ) : (
        <div className="creator-card__image creator-card__image--placeholder">
          <span>{name?.charAt(0) ?? '?'}</span>
        </div>
      )}
      <div className="creator-card__content">
        <h2 className="creator-card__title">{name}</h2>
        <p className="creator-card__description">{description}</p>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            className="creator-card__link"
          >
            Visit channel
          </a>
        )}
        <div className="creator-card__actions">
          <button type="button" className="button button--secondary" onClick={handleEdit}>
            Edit
          </button>
          <button
            type="button"
            className="button button--danger"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default CreatorCard;
