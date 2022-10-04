import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

export default function home() {
  const [dogs, setDogs] = useState([])
  const [text, setText] = useState('')
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    const fetchDogData = async () => {
      try {
        const res = await fetch('https://api.thedogapi.com/v1/breeds')
        const data = await res.json()
        setDogs(data)
      } catch (error) {
        console.error(error)
      }
    }

    setSearched(false)
    fetchDogData()
  }, [])

  const searchForDog = async () => {
    try {
      const res = await fetch(
        `https://api.thedogapi.com/v1/breeds/search?q=${text}`
      )
      const data = await res.json()
      setDogs(data)
    } catch (error) {
      console.error(error)
    }
  }
  const handleSubmit = e => {
    e.preventDefault()

    searchForDog()
    setSearched(true)
  }

  return (
    <>
      {!dogs ? (
        <h1>Carregando...</h1>
      ) : (
        <>
          <section className="mt-3">
            <h1 className="d-flex justify-content-center ">Dog API</h1>
          </section>

          <div className="container mt-3">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicSearch">
                <Form.Control
                  type="text"
                  placeholder="German"
                  value={text}
                  onChange={e => setText(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Encontre qualquer raça de cachorro.
                </Form.Text>
              </Form.Group>
            </Form>
          </div>

          <div className="container ">
            <div className="row cols d-flex justify-content-center gap-5">
              {!searched
                ? dogs.map(dog => (
                    <Card style={{ width: '18rem' }} className="p-0">
                      <Card.Img
                        className="img-responsive h-50"
                        variant="top"
                        src={dog.image.url}
                        alt={dog.name}
                      />
                      <Link
                        to={`/${dog.name}`}
                        style={{ textDecoration: 'none', color: 'black' }}
                        key={dog.id}
                      >
                        <Card.Body>
                          <Card.Title>{dog.name}</Card.Title>
                          <Card.Text>Criado para: {dog.bred_for}</Card.Text>
                        </Card.Body>
                      </Link>
                    </Card>
                  ))
                : dogs.map(dog => (
                    <Card style={{ width: '18rem' }} className="p-0">
                      <Card.Img
                        className="img-responsive h-50"
                        variant="top"
                        src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`}
                        alt={dog.name}
                      />
                      <Link
                        to={`/${dog.name}`}
                        style={{ textDecoration: 'none', color: 'black' }}
                        key={dog.id}
                      >
                        <Card.Body>
                          <Card.Title>{dog.name}</Card.Title>
                          <Card.Text>Criado para: {dog.bred_for}</Card.Text>
                        </Card.Body>
                      </Link>
                    </Card>
                  ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}
