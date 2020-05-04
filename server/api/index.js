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
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1ODg1OTg4MzgsImV4cCI6MTU4ODY4NTIzOCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI5ZDljMTRlNTU1NzM0YjMzYmJmMmY1ZWU2YmVmMjg2ZSIsInNjb3BlIjpbImJhc2ljIl19.Gx8wLfSNlStlHBv9skG5MQqzLzSqfDIG7Z4O7U-lWeZqv5jxI6fRzGv9GiVq3S77vHq7ru3IxLQbMShRSWt2Pj9gSbTOKIhGdGTvidnXaCVtTjPj2bDNH-BbboKgKmxLB57u0l5DFrGuUb8Yv7vC0HBaQ0W_3iCDywBzc7sjzCB8WCwVc_DzUwxgij--qi1lKx2C6GJoSqu0Ryf2btaq2SKdunGYW_ko3GR6bj2qIJPYA9DPG84czGjxNi7Qb1NLKhA86WxE-98x1DHmh259djxm8rPSUzffkoRykxjr07mTSa8F2EeuolaOF6wYBabsn1qrgsmUNcvjdBPDmhtuqQ'
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
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1ODg1OTg4MzgsImV4cCI6MTU4ODY4NTIzOCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI5ZDljMTRlNTU1NzM0YjMzYmJmMmY1ZWU2YmVmMjg2ZSIsInNjb3BlIjpbImJhc2ljIl19.Gx8wLfSNlStlHBv9skG5MQqzLzSqfDIG7Z4O7U-lWeZqv5jxI6fRzGv9GiVq3S77vHq7ru3IxLQbMShRSWt2Pj9gSbTOKIhGdGTvidnXaCVtTjPj2bDNH-BbboKgKmxLB57u0l5DFrGuUb8Yv7vC0HBaQ0W_3iCDywBzc7sjzCB8WCwVc_DzUwxgij--qi1lKx2C6GJoSqu0Ryf2btaq2SKdunGYW_ko3GR6bj2qIJPYA9DPG84czGjxNi7Qb1NLKhA86WxE-98x1DHmh259djxm8rPSUzffkoRykxjr07mTSa8F2EeuolaOF6wYBabsn1qrgsmUNcvjdBPDmhtuqQ'
      }
    }
    requestPromise(options).then(response => {
      console.log(response)
      res.json(response)
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
