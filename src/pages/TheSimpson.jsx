import { useEffect, useState } from "react"


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

  return (
    <>
      <main>
      <div className="tittle">The Simpson</div>
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
              <h2>{ch.name}</h2>
              <img src={`https://cdn.thesimpsonsapi.com/200${ch.portrait_path
                }`} alt={ch.name} />
              <p><strong>Age: </strong> {ch.age}</p>
              <p><strong>Gender: </strong>{ch.gender}</p>
              <p><strong>Occupation: </strong>{ch.occupation}</p>
              <p><strong>Birthdate: </strong>{ch.birthdate}</p>
              <p><strong>Status: </strong>{ch.status}</p>

            </div>
          ))
          }
        </div>

        <div className="pagination">
          <button
            name="before"
            onClick={() => paginationButton('before')}
          >←</button>
          <p>{charater}</p>
          <button
            name="after"
            onClick={() => paginationButton('after')}
          >→</button>
        </div>
      </main>
    </>
  )
}
