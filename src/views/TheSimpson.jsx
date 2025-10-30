import { useEffect, useState } from "react"
import logo from '../assets/The_Simpsons_yellow_logo.svg'


export default function TheSimpson() {


  const [data, setData] = useState([])
  const [charater, setcharater] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchText, setSearchText] = useState('')



  useEffect(() => {

    const getData = async () => {
      const res = await fetch(`https://thesimpsonsapi.com/api/characters?page=${charater}`)
      const json = await res.json()
      console.log(json)
      console.log(json.results.portrait_path)
      setData(json.results)
      setLoading(false)
    }
    getData()
  }, [charater])


  const paginationButton = (inputName) => {
    if (inputName == "after" && charater < 20) {
      setcharater(charater + 1)

    } else if (inputName == "before" && charater > 1) {
      setcharater(charater - 1)
    }

  }

  const findCard = data.filter(card => {

    if (!searchText) {
      return true
    }

    const newSearchValue = searchText.toLowerCase()

    const filterByName = card.name
      .toLowerCase()
      .includes(newSearchValue)

    const filterByOccupation = card.occupation
      .toLowerCase()
      .includes(newSearchValue)


    return filterByName || filterByOccupation


  })

  const cutPhrase = (phrase, maxlengh = 50) => {
    if (!phrase || phrase.length <= maxlengh) {
      return phrase;
    }
    return phrase.substring(0, maxlengh) + '...';
  };

  return (
    <>
      <main>
        <div className="tittle">
          <img src={logo} alt="The Simpson Logo" className="logo" />
        </div>
        <div className="searchContainer">
          <label htmlFor="search" >Search</label>
          <input
            className="search"
            id="search"
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="container">
          {!loading && findCard.map((ch) => (
            <div key={ch.id} className="card">

              <div className="card_head">
                <h2>{cutPhrase(ch.name,25)}</h2>
                <div className="card_picture">
                  <img src={`https://cdn.thesimpsonsapi.com/200${ch.portrait_path
                    }`} alt={ch.name} />
                </div>
              </div>

              <div className="card_texts">
                <p><strong>Age: </strong> {ch.age ? ch.age :'unknown'}</p>
                <p><strong>Gender: </strong>{(ch.gender) ? ch.gender :'unknown'}</p>
                <p><strong>Occupation: </strong>{cutPhrase(ch.occupation ? ch.occupation :'unknown',40)}</p>
                <p><strong>Birthdate: </strong>{ch.birthdate ? ch.birthdate :'unknown'}</p>
                <p className="phrase"><span>Phrases: </span>{cutPhrase( ch.phrases[0] ? ch.phrases[0] :'unknown',40)}</p>
                <p>
                  <span className={ch.status === "Alive" ? "statusalive" : "statusdead"}>{ch.status ? ch.status :'unknown'}</span>
                </p>

              </div>
            </div>
          ))
          }
        </div>

        <div className="pagination">
          <button
            name="before"
            onClick={() => paginationButton('before')}
          >←</button>
          <p className="pageNumber">{charater}</p>
          <button
            name="after"
            onClick={() => paginationButton('after')}
          >→</button>
        </div>
      </main>
    </>
  )
}
