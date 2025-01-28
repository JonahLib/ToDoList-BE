import cors from 'cors'
import express, { Application, Request, Response } from 'express'

import { getId } from './helpers'
import { ToDOItem } from './item.model'

const items: ToDOItem[] = []

const app: Application = express()
app.use(cors())
app.use(express.json())

app.get('/items', (_req: Request, res: Response): void => {



  res.status(200).send(items)
})

app.post('/items', (req: Request, res: Response): void => {
  if (!req.body) {
    res.status(400).send({ error: 'No body provided' })
    res
    return
  }

  const { id, title, description, done = false }: ToDOItem = req.body

  if (!title) {
    res.status(400).send({ error: 'title is a required field' })
    return
  }

  const item: ToDOItem = { id: getId(id), title, description, done }

  items.push(item)

  res.status(200).send(items)
})

app.get('/items/:id', (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10)

  if (isNaN(id)) {
    res.status(400).send({ error: 'Invalid ID format' })
    return
  }

  const item = items.find((item) => item.id === id)

  if (!item) {
    res.status(404).send({ error: 'Item not found' })
    return
  }

  res.status(200).send(item)
})

app.put('/items/:id', (req, res): any => {
  if (!req.params.id) return res.status(400).send({ error: 'No ID Provided' })

  const id = parseInt(req.params.id)
  const item = items.find((item) => item.id === id)

  if (!item) return res.status(404).send({ error: 'Item not found' })

  const updateItem: ToDOItem = req.body

  if (!updateItem) return res.status(400).send({ error: 'No body provided' })

  if (updateItem.title) item.title = updateItem.title

  if (updateItem.description) item.description = updateItem.description

  if (updateItem.done !== undefined) item.done = updateItem.done

  res.status(200).send(items)
})

app.delete('/items/:id', (req:Request, res:Response) => {
  const id = parseInt(req.params.id)

  const filteredItems = items.filter((item) => item.id !== id)

  if (filteredItems.length === items.length) {
    return res.status(404).send({ error: 'Item not found' })
  }

  items.length = 0

  items.push(...filteredItems)

  res.status(200).send(items)
})

app.listen(3000, (): void => {
  console.log('express server started on port 3000')
})
