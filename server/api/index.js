const router = require('express').Router()
const requestPromise = require('request-promise')
const axios = require('axios')

// const Socks = require('socks')

// const fixieUrl = process.env.FIXIE_SOCKS_HOST
// const fixieValues = fixieUrl.split(new RegExp('[/(:\\/@)/]+'))

// const socksAgent = new Socks.Agent(
//   {
//     proxy: {
//       ipaddress: fixieValues[2],
//       port: fixieValues[3],
//       type: 5,
//       authentication: {
//         username: fixieValues[0],
//         password: fixieValues[1]
//       }
//     }
//   },
//   true, // true HTTPS server, false for HTTP server
//   false // rejectUnauthorized option passed to tls.connect()
// )

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
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1OTEwNDYyNDIsImV4cCI6MTU5MTEzMjY0MiwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI5ZDljMTRlNTU1NzM0YjMzYmJmMmY1ZWU2YmVmMjg2ZSIsInNjb3BlIjpbImJhc2ljIl19.I2NB4E2BAIY5Di1XI3WXD68gejaqSr1srVSg4CHdtp4xkzoLizzfiCa9jm_lUeu6ZbKZ7g9FW3Z6LEfl0qnfa08KhEU4kmK9JK9riN7p_w5KtlN4cwad_sZ0x9nwp6zcCpoCAa6KcIXL10wjjYuxftbIqeEkwHhS7qcFRL5lxoCgOjFxEXAnJLW3amCEKB7KYZg5cFmWBVM7hqteUcE_SSejpGPeeHtOVec4KxV-YNSxi45-TvVp5RZrB-XB3tjiDxRk2_y7EVVoOSeh0xXTFuybUnyyWOpYStnvyZKDbyydb33QnUEln_xvJ3J6GDO3WsPNPxfUIdb9mj9lWf3HJw'
      }
      // agent: socksAgent
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
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1OTEwNDYyNDIsImV4cCI6MTU5MTEzMjY0MiwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI5ZDljMTRlNTU1NzM0YjMzYmJmMmY1ZWU2YmVmMjg2ZSIsInNjb3BlIjpbImJhc2ljIl19.I2NB4E2BAIY5Di1XI3WXD68gejaqSr1srVSg4CHdtp4xkzoLizzfiCa9jm_lUeu6ZbKZ7g9FW3Z6LEfl0qnfa08KhEU4kmK9JK9riN7p_w5KtlN4cwad_sZ0x9nwp6zcCpoCAa6KcIXL10wjjYuxftbIqeEkwHhS7qcFRL5lxoCgOjFxEXAnJLW3amCEKB7KYZg5cFmWBVM7hqteUcE_SSejpGPeeHtOVec4KxV-YNSxi45-TvVp5RZrB-XB3tjiDxRk2_y7EVVoOSeh0xXTFuybUnyyWOpYStnvyZKDbyydb33QnUEln_xvJ3J6GDO3WsPNPxfUIdb9mj9lWf3HJw'
      }
      // agent: socksAgent
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
