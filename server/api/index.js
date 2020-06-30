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
        Authorization: `Bearer ${process.env.FAT_SECRET ||
          'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1OTM1MzEwNDQsImV4cCI6MTU5MzYxNzQ0NCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI5ZDljMTRlNTU1NzM0YjMzYmJmMmY1ZWU2YmVmMjg2ZSIsInNjb3BlIjpbImJhc2ljIl19.QVUQVA92Hzq27942MvawBb1TGRWCRIbPLj5YQVVrTu8Hyr7xYz9tELcnhhsXX2uzylc_O1OTHpUSscAry27upiZi2FxudeTMEIpId9IuXPrEZ_F0dFCaF6l-Ah46ZVFD48_ItSl1n_X0LFe6vqfrFkJhiwS-7pnIz0BOFyc8ryOKi_uww6FKvycct4Z3p0J2XYCHXtHGlm3utkALupzUDUBouHnDeBrabyS-h_gfrQxDyn-6oTYX3QVahA0yIVlShSAVk1ZYqREa82w2WmBeCAPBTDSWf3vZbZopRPNGIn_5mEM4aq6jSnGWKt_aZ9APD95P05xPUVa6oPG-SNnHEg'}`
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
        Authorization: `Bearer ${process.env.FAT_SECRET ||
          'eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1OTM1MzEwNDQsImV4cCI6MTU5MzYxNzQ0NCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI5ZDljMTRlNTU1NzM0YjMzYmJmMmY1ZWU2YmVmMjg2ZSIsInNjb3BlIjpbImJhc2ljIl19.QVUQVA92Hzq27942MvawBb1TGRWCRIbPLj5YQVVrTu8Hyr7xYz9tELcnhhsXX2uzylc_O1OTHpUSscAry27upiZi2FxudeTMEIpId9IuXPrEZ_F0dFCaF6l-Ah46ZVFD48_ItSl1n_X0LFe6vqfrFkJhiwS-7pnIz0BOFyc8ryOKi_uww6FKvycct4Z3p0J2XYCHXtHGlm3utkALupzUDUBouHnDeBrabyS-h_gfrQxDyn-6oTYX3QVahA0yIVlShSAVk1ZYqREa82w2WmBeCAPBTDSWf3vZbZopRPNGIn_5mEM4aq6jSnGWKt_aZ9APD95P05xPUVa6oPG-SNnHEg'}`
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
