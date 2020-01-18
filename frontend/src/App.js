import React, {useEffect, useState} from 'react';

import api from './services/api';

import './global.css';
import './app.css';
import './sidebar.css';
import './main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';
import Header from './components/Header';

function App() {
  const [devs, setDevs] = useState([]);
  const [method, setMethod] = useState('post');
  const [devSelected, setDevSelected] = useState(null);

  useEffect(() => {
    async function loadDevs() {
      const {data: response} = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data, method = 'post', id = false) {
    try {
      const {data:response} = await api[method](`/devs${id ? `/${id}` : ''}`, data);
      setDevs([...devs.filter(dev => dev.github_username !== data.github_username), response.data]);
    } catch (error) {
      console.log([error]);
    }
  }

  async function handleDelete(id) {
    setDevs([...devs.filter(dev => dev._id !== id)]);
    await api.delete(`/devs/${id}`);

    const {data: response} = await api.get('/devs');

    setDevs(response.data);
  }

  return (
    <>
      <Header />
      <div id="app">
        <aside>
          <strong>{method === 'post' ? 'Cadastrar' : 'Editar'}</strong>
          <DevForm
            method={method}
            onSubmit={handleAddDev}
            devSelected={devSelected}
            onUnEdit={setDevSelected}
            setMethod={setMethod}
          />
        </aside>
        <main>
          <ul>
            {devs.map(dev => (
              <DevItem
                key={dev._id}
                dev={dev}
                onEdit={setDevSelected}
                setMethod={setMethod}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}

export default App;
