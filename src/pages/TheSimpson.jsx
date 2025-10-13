import { useEffect, useState } from "react"


export default function TheSimpson() {


  const [data, setData] = useState([])
  const [charater, setcharater] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)



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


  return (
    <>

      <div>The Simpson</div>
      <div className="container">
        {!loading && data.map((ch) => (
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
    </>
  )
}
