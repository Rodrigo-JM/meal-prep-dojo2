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
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1ODg1MzM3OTgsImV4cCI6MTU4ODYyMDE5OCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI5ZDljMTRlNTU1NzM0YjMzYmJmMmY1ZWU2YmVmMjg2ZSIsInNjb3BlIjpbImJhc2ljIl19.UK5l28qWc8SL6NkN3lt2uovhWfsWsoxSuBG3k-W-tCRmSRvuGQKtMpUl66D1Aa9Bkegxwzb6-e_acULhG1pdH4dI33XVYOi5kB4k2nHOpQRGwXYqJ8Yc0jcgatknbLjfsrR8gH-I1KrvshIUQfQIS7Z3Qi8F1bAgb7qYBRiyWLysOmwCuSLDEJzERZW874aG3xdGqWB7dJi_ErW3OWmHiZ8wfRbFgaHRY91Jvrsppi0OdS_uyzK8XKZ-LXtTJg7pLIhBRQuQsOUGvKtZrP_AtVBtcbDWsmueT3nz3PEu8mZQcMFdtL1BudSWjxqnAMffSQVh4JBo0AJw_bKhkROs-A'
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
          'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1ODg1MzM3OTgsImV4cCI6MTU4ODYyMDE5OCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI5ZDljMTRlNTU1NzM0YjMzYmJmMmY1ZWU2YmVmMjg2ZSIsInNjb3BlIjpbImJhc2ljIl19.UK5l28qWc8SL6NkN3lt2uovhWfsWsoxSuBG3k-W-tCRmSRvuGQKtMpUl66D1Aa9Bkegxwzb6-e_acULhG1pdH4dI33XVYOi5kB4k2nHOpQRGwXYqJ8Yc0jcgatknbLjfsrR8gH-I1KrvshIUQfQIS7Z3Qi8F1bAgb7qYBRiyWLysOmwCuSLDEJzERZW874aG3xdGqWB7dJi_ErW3OWmHiZ8wfRbFgaHRY91Jvrsppi0OdS_uyzK8XKZ-LXtTJg7pLIhBRQuQsOUGvKtZrP_AtVBtcbDWsmueT3nz3PEu8mZQcMFdtL1BudSWjxqnAMffSQVh4JBo0AJw_bKhkROs-A'
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
