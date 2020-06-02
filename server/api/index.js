const router = require('express').Router()
const requestPromise = require('request-promise')
const axios = require('axios')

let socksAgent =
  process.env.NODE_ENV === 'production' ? require('../socks.js') : {}

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
        Authorization: `Bearer ${process.env.NEW_TOKEN ||
          'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1OTExMjcwNjgsImV4cCI6MTU5MTIxMzQ2OCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI5ZDljMTRlNTU1NzM0YjMzYmJmMmY1ZWU2YmVmMjg2ZSIsInNjb3BlIjpbImJhc2ljIl19.jzkBsfYe9wEFuXxjgFAmLi1fJd_i95s8xpwdj8Y27dEl4go46Hmz1tKrAnd7YWEoOKoJc1wCYCRyy93aosc-E4ZGaZB4vajSpQ_t3bWQ-kneWi9mqNPMmnW1QfmphJqx0Khc8LTcMI3x78iMVY5TAHHBTeJnb4gDqAd72YfnY9h2tEfW0qeKMVvNqSkAQL4BgbtSrk4TrDOOov1fE2KF_HTfsaLB37nKZ-Ht43ECfALFmSgo7ORjKA9-66_1CR9aLDwR7hvEJuDLMhn_5I1EUU7XN5Jex8p5PJxGFj3sX1o4l8djs6HY65tLrFk-D9Jev4VNI1_JMvigZzQwSBdIFQ'}`
      }
    }

    if (process.env.NODE_ENV === 'production') {
      options.agent = socksAgent
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
        Authorization: `Bearer ${process.env.NEW_TOKEN ||
          'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1OTExMjcwNjgsImV4cCI6MTU5MTIxMzQ2OCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI5ZDljMTRlNTU1NzM0YjMzYmJmMmY1ZWU2YmVmMjg2ZSIsInNjb3BlIjpbImJhc2ljIl19.jzkBsfYe9wEFuXxjgFAmLi1fJd_i95s8xpwdj8Y27dEl4go46Hmz1tKrAnd7YWEoOKoJc1wCYCRyy93aosc-E4ZGaZB4vajSpQ_t3bWQ-kneWi9mqNPMmnW1QfmphJqx0Khc8LTcMI3x78iMVY5TAHHBTeJnb4gDqAd72YfnY9h2tEfW0qeKMVvNqSkAQL4BgbtSrk4TrDOOov1fE2KF_HTfsaLB37nKZ-Ht43ECfALFmSgo7ORjKA9-66_1CR9aLDwR7hvEJuDLMhn_5I1EUU7XN5Jex8p5PJxGFj3sX1o4l8djs6HY65tLrFk-D9Jev4VNI1_JMvigZzQwSBdIFQ'}`
      }
    }

    if (process.env.NODE_ENV === 'production') {
      options.agent = socksAgent
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
