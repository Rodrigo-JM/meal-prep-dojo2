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

const Socks = require('socks')

const fixieUrl = process.env.FIXIE_SOCKS_HOST
const fixieValues = fixieUrl.split(new RegExp('[/(:\\/@)/]+'))

const socksAgent = new Socks.Agent(
  {
    proxy: {
      ipaddress: fixieValues[2],
      port: fixieValues[3],
      type: 5,
      authentication: {
        username: fixieValues[0],
        password: fixieValues[1]
      }
    }
  },
  true, // true HTTPS server, false for HTTP server
  false // rejectUnauthorized option passed to tls.connect()
)

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
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1ODg3ODg3NzgsImV4cCI6MTU4ODg3NTE3OCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI5ZDljMTRlNTU1NzM0YjMzYmJmMmY1ZWU2YmVmMjg2ZSIsInNjb3BlIjpbImJhc2ljIl19.EvGAP5yfPScCesGeCgpTg6lQv813o4vIW-mfKMViSFseYt9XHmNFvj2U99gGnjmnXUkWYnGKimTqLdrxxwnDUjHPyC9vWolgmQ_yU_PtXTaUzEKxxYLwgXZ_w3n3lkOxdnL2GD46p4ZtFXexisH97XydtapFbcu2RB_QUHXymN952jgz5Li7oKqvJgfmr6WPn4TpSNzHD9B5XwUfvAt_x101wcLgC1Gkb3XB4MOKm4lUe5twN-I5IJhvfDRblvN_lCxU8KCi-fJz7hy2_tcPN449mKVfFrKQoX7jB4XyeTLm7pN4DnNoIM6QeJ5tUVvBg10sfEM7NTcUh6YtCI8hVg'
      },
      agent: socksAgent
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
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1ODg3ODg3NzgsImV4cCI6MTU4ODg3NTE3OCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI5ZDljMTRlNTU1NzM0YjMzYmJmMmY1ZWU2YmVmMjg2ZSIsInNjb3BlIjpbImJhc2ljIl19.EvGAP5yfPScCesGeCgpTg6lQv813o4vIW-mfKMViSFseYt9XHmNFvj2U99gGnjmnXUkWYnGKimTqLdrxxwnDUjHPyC9vWolgmQ_yU_PtXTaUzEKxxYLwgXZ_w3n3lkOxdnL2GD46p4ZtFXexisH97XydtapFbcu2RB_QUHXymN952jgz5Li7oKqvJgfmr6WPn4TpSNzHD9B5XwUfvAt_x101wcLgC1Gkb3XB4MOKm4lUe5twN-I5IJhvfDRblvN_lCxU8KCi-fJz7hy2_tcPN449mKVfFrKQoX7jB4XyeTLm7pN4DnNoIM6QeJ5tUVvBg10sfEM7NTcUh6YtCI8hVg'
      },
      agent: socksAgent
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
