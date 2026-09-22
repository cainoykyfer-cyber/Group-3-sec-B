const router = require('express').Router()

let users = [
  { id: 1, name: "James", address: "Cebu", role: "admin" },
  { id: 2, name: "Maria", address: "Manila", role: "member" }
]

router.get('/', (req, res) => {
  let result = users

  if (req.query.role) {
    result = users.filter(u => u.role === req.query.role)
  }

  res.json({
    success: true,
    data: result,
    meta: {
      timestamp: new Date().toISOString(),
      count: result.length
    }
  })
})

router.get('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id)

  if (!user) {
    return res.status(404).json({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "User not found."
      }
    })
  }

  res.json({
    success: true,
    data: user,
    meta: {
      timestamp: new Date().toISOString(),
      count: 1
    }
  })
})

router.post('/', (req, res) => {
  const { name, address, role } = req.body

  if (!name || !address) {
    return res.status(400).json({
      success: false,
      error: {
        code: "BAD_REQUEST",
        message: "name and address are required."
      }
    })
  }

  const user = {
    id: users.length + 1,
    name,
    address,
    role: role || "member"
  }

  users.push(user)

  res.status(201).json({
    success: true,
    data: user,
    meta: {
      timestamp: new Date().toISOString(),
      count: 1
    }
  })
})

router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id == req.params.id)

  if (index == -1) {
    return res.status(404).json({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "User not found."
      }
    })
  }

  users.splice(index, 1)
  res.status(204).send()
})

module.exports = router