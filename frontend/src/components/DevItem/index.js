import React from 'react';

import './styles.css';

export default function DevItem({dev, onEdit, setMethod, onDelete}) {
  function handleEdit() {
    onEdit(dev);
    setMethod('put');
  }

  return (
    <li className="dev-item">
      <div>
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      </div>
      <div className="footer-container">
        <a href={`https://github.com/${dev.github_username}`} target="blank" rel="noopener noreferrer">Acessar perfil no GitHub</a>
        <div className="actions">
          <button type="button" className="btn" onClick={handleEdit}>Editar</button>
          <button type="button" className="btn danger" onClick={() => onDelete(dev._id)}>Deletar</button>
        </div>
      </div>
    </li>
  );
}
