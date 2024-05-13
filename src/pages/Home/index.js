import { useState } from 'react'

import { Header } from '../../components/Header'
import background from '../../assets/background.png'
import './styles.css'
import ItemList from '../../components/ItemList'

function App() {
  const [user, setUser] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [repos, setRepos] = useState([])

  const handleGetData = async () => {
    try {
      const userData = await fetch(`https://api.github.com/users/${user}`)
      const newUser = await userData.json()

      if (newUser.name) {
        setCurrentUser(newUser)

        const reposData = await fetch(
          `https://api.github.com/users/${user}/repos`
        )
        const newRepos = await reposData.json()

        if (Array.isArray(newRepos) && newRepos.length) {
          setRepos(newRepos)
        } else {
          setRepos([])
        }
      } else {
        setCurrentUser(null)
        setRepos([])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setCurrentUser(null)
      setRepos([])
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="content">
        <img src={background} className="background" alt="background app" />
        <div className="info">
          <div>
            <input
              name="User"
              value={user}
              onChange={(event) => setUser(event.target.value)}
              placeholder="@username"
            />
            <button onClick={handleGetData}>Search</button>
          </div>
          {currentUser ? (
            <>
              <div className="profile">
                <img
                  src={currentUser.avatar_url}
                  alt="photo profile"
                  className="profile-img"
                />
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : null}
          {repos?.length ? (
          <div>
            <h4 className="repositories">Repositories</h4>
            {repos.map((repo) => (
              <ItemList
                key={repo.id}
                title={repo.name}
                description={repo.description || 'No description'}
              />
            ))}
          </div>
          ): null}
        </div>
      </div>
    </div>
  )
}

export default App
