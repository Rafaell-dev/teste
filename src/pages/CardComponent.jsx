import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function CardComponent() {
  const [dog, setDog] = useState([])
  const { name } = useParams()

  useEffect(() => {
    const fetchUnicoDogData = async () => {
      try {
        const res = await fetch(
          `https://api.thedogapi.com/v1/breeds/search?q=${name}`
        )
        const data = await res.json()
        setDog(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUnicoDogData()
  }, [name])
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100 ">
        {dog.map(item => (
          <div key={item.id}>
            <div className="row ">
              <div className="col">
                <img
                  src={`https://cdn2.thedogapi.com/images/${item.reference_image_id}.jpg`}
                  alt={item.name}
                  className="rounded img-fluid"
                />
              </div>
              <div className="col">
                <h2 className="fw-bold">{item.name}</h2>
                <ul>
                  <li>Criado para: {item.bred_for}</li>
                  <li>Altura: {item.height.metric} cm</li>
                  <li>Expectativa de vida: {item.life_span}</li>
                  <li>Temperamento: {item.temperament}</li>
                </ul>
                <Link to={'/'} className="mt-5 inline-block btn btn-primary btn-dark">
                  Voltar
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
