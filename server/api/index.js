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
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1ODgzNTg1NTYsImV4cCI6MTU4ODQ0NDk1NiwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI5ZDljMTRlNTU1NzM0YjMzYmJmMmY1ZWU2YmVmMjg2ZSIsInNjb3BlIjpbImJhc2ljIl19.erhUBVdxtH6_0yuQ92vsmqd_8pULyC9XImwU1Shq8jzWPXBiHWsIgvRMb8kkwbo993nnvRRzOXcnFUtsuabhMIHI7tsCMnflwwfTvZAGO72eSYAC3oo13RWb7d8vFXn6shzhG0llanHYMBU2BYoDDwqiy8VQzMzwpo1dEI5RqrQJtr29ksMPwIkahCj0-gUjb_mKiiKPiICY5ZDQOTfsAytT4wfB0CyBLpFI6EMLO7fcfK12L3JUQ1q8RddVyIxlZTYOgpziGFSqYdrBZbvWY_XD-kElFuWzMnOsypRVtdWDf-qeUGA_D0ICU85ago_nibfAgDVQiPn5ScnHM05PjA'
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
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1ODgzNTg1NTYsImV4cCI6MTU4ODQ0NDk1NiwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI5ZDljMTRlNTU1NzM0YjMzYmJmMmY1ZWU2YmVmMjg2ZSIsInNjb3BlIjpbImJhc2ljIl19.erhUBVdxtH6_0yuQ92vsmqd_8pULyC9XImwU1Shq8jzWPXBiHWsIgvRMb8kkwbo993nnvRRzOXcnFUtsuabhMIHI7tsCMnflwwfTvZAGO72eSYAC3oo13RWb7d8vFXn6shzhG0llanHYMBU2BYoDDwqiy8VQzMzwpo1dEI5RqrQJtr29ksMPwIkahCj0-gUjb_mKiiKPiICY5ZDQOTfsAytT4wfB0CyBLpFI6EMLO7fcfK12L3JUQ1q8RddVyIxlZTYOgpziGFSqYdrBZbvWY_XD-kElFuWzMnOsypRVtdWDf-qeUGA_D0ICU85ago_nibfAgDVQiPn5ScnHM05PjA'
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
