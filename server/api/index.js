const router = require('express').Router()
const requestPromise = require('request-promise')
const axios = require('axios')
const generateCode = function() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  )
}

router.get('/search/:value', async (req, res, next) => {
  try {
    const options = {
      uri: 'https://platform.fatsecret.com/rest/server.api',
      method: 'POST',
      qs: {
        method: 'foods.search',
        search_expression: req.params.value,
        format: 'json',
        max_results: 50
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1ODg0NDU0NDYsImV4cCI6MTU4ODUzMTg0NiwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI5ZDljMTRlNTU1NzM0YjMzYmJmMmY1ZWU2YmVmMjg2ZSIsInNjb3BlIjpbImJhc2ljIl19.U2k9j9j0o8wJOBKIHAy0EmwT1IvsMgC0_wP-35PP5nsDk6EGmjX8SetSF2wiUKX0Me8zSXrDpuk2howG_PLW4AaaWFPe-LwtO5GPQiVgT3wonKjZeaR6IPPyMUKvj6_2VyilfFdvjiB0tLZZ27tbz7Ko4UP6RZxEM0qdBfiams4lqugwDGv6ZoAEC1E13oCtoZY-SiJ7mDMjLh08Orfk2eEE9PPl8BCby9jolg4AVo4TVlc7jX0hiopbUUFS13nwe_zFKc8VPfLxw-CImnSJdv460QrWB9Rzq7wxIjj68a4ws8iIYVE1KMMN5xPl2FPahtQJAssD5_qgtV5AYQmUwg'
      }
    }
    requestPromise(options).then(response => {
      res.json(response)
    })
  } catch (err) {
    next(err)
  }
})

router.get('/select/:itemId', async (req, res, next) => {
  try {
    const options = {
      uri: 'https://platform.fatsecret.com/rest/server.api',
      method: 'POST',
      qs: {
        method: 'food.get',
        food_id: req.params.itemId,
        format: 'json'
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1ODg0NDU0NDYsImV4cCI6MTU4ODUzMTg0NiwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI5ZDljMTRlNTU1NzM0YjMzYmJmMmY1ZWU2YmVmMjg2ZSIsInNjb3BlIjpbImJhc2ljIl19.U2k9j9j0o8wJOBKIHAy0EmwT1IvsMgC0_wP-35PP5nsDk6EGmjX8SetSF2wiUKX0Me8zSXrDpuk2howG_PLW4AaaWFPe-LwtO5GPQiVgT3wonKjZeaR6IPPyMUKvj6_2VyilfFdvjiB0tLZZ27tbz7Ko4UP6RZxEM0qdBfiams4lqugwDGv6ZoAEC1E13oCtoZY-SiJ7mDMjLh08Orfk2eEE9PPl8BCby9jolg4AVo4TVlc7jX0hiopbUUFS13nwe_zFKc8VPfLxw-CImnSJdv460QrWB9Rzq7wxIjj68a4ws8iIYVE1KMMN5xPl2FPahtQJAssD5_qgtV5AYQmUwg'
      }
    }
    requestPromise(options).then(response => {
      res.json(response)
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
