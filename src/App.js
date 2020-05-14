import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      console.log('Catching content from api.')
      setRepositories(response.data)
    })
  }, [])


  async function handleAddRepository() {
    console.log('Creating a new repository.')
    const { data } = await api.post('repositories', {
      id: Date.now(),
      title: 'Desafio ReactJS',
      url: 'https://github.com/williamtorres1/new-repository',
      techs: ['JavaScript', 'ReactJS']
    })

    setRepositories([...repositories, data])
    console.log('New repository created.')
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const repositoryIndex = repositories.findIndex(repository => repository.id === id)
    setRepositories(repositories.filter(
      repository => repository.id !== id
      ))
    console.log('Repository removed.')
  }


  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <p>{repository.title}</p>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
