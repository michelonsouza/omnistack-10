import React, {useState, useEffect, useMemo} from 'react';
import Spinner from 'react-spinner-material';

import './styles.css';

export default function DevForm({onSubmit, method, devSelected, setMethod, onUnEdit}) {
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [name, setName] = useState('');
  const [avatar_url, setAvatarUrl] = useState('');
  const [bio, setBio] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(result => {
      const {latitude, longitude} = result.coords;

      setLatitude(latitude);
      setLongitude(longitude);
    }, error => {
      console.log(error);
    }, {
      timeout: 30000,
    });
  }, []);

  useMemo(() => {
    if (devSelected) {
      setGithubUsername(devSelected.github_username);
      setTechs(devSelected.techs);
      setName(devSelected.name);
      setAvatarUrl(devSelected.avatar_url);
      setBio(devSelected.bio);
    } else {
      setGithubUsername('');
      setTechs('');
      setName('');
      setAvatarUrl('');
      setBio('');
    }
  }, [devSelected])

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const body = {
      github_username,
      techs,
      latitude,
      longitude,
    };

    if (method === 'put') {
      body.avatar_url = avatar_url;
      body.name = name;
      body.bio = bio;
      body.techs = techs;
    }

    await onSubmit(body, method, method === 'put' ? devSelected._id : false);

    setMethod('post');
    onUnEdit(null);
    setGithubUsername('');
    setTechs('');
    setName('');
    setAvatarUrl('');
    setBio('');
    setLoading(false);
  }

  function handleCancel() {
    onUnEdit(null);
    setMethod('post');
  }

  return (
    <form onSubmit={handleSubmit}>
      {method === 'post' && (
        <div className="input-block">
          <label htmlFor="github_username">Usuário do github</label>
          <input
            type="text"
            name="github_username"
            id="github_username"
            value={github_username}
            onChange={e => setGithubUsername(e.target.value)}
            disabled={loading}
            required />
        </div>
      )}

      {method === 'put' && (
        <>
          <div className="input-block">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={loading}
              required />
          </div>

          <div className="input-block">
            <label htmlFor="avatar_url">Avatar URL</label>
            <input
              type="text"
              name="avatar_url"
              id="avatar_url"
              value={avatar_url}
              onChange={e => setAvatarUrl(e.target.value)}
              disabled={loading}
              required />
          </div>

          <div className="input-block">
            <label htmlFor="bio">Bio</label>
            <textarea
              name="bio"
              id="bio"
              rows="6"
              value={bio}
              onChange={e => setBio(e.target.value)}
              disabled={loading}
              required />
          </div>
        </>
      )}

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          type="text"
          name="techs"
          id="techs"
          value={techs}
          onChange={e => setTechs(e.target.value)}
          disabled={loading}
          required />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
          type="number"
          name="latitude"
          id="latitude"
          value={latitude}
          onChange={e => setLatitude(e.target.value)}
          disabled={loading}
          required />
        </div>
        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
          type="number"
          name="longitude"
          id="longitude"
          value={longitude}
          onChange={e => setLongitude(e.target.value)}
          disabled={loading}
          required />
        </div>
      </div>

      <button type="submit" disabled={loading}>{loading ? <Spinner size={20} spinnerColor="#fff" spinnerWidth={3} /> : 'Salvar'}</button>
      {method === 'put' && <button type="button" onClick={handleCancel}>Cancelar Edição</button>}
    </form>
  );
}
