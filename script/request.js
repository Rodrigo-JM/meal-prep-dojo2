var request = require('request')
clientID = '9d9c14e555734b33bbf2f5ee6bef286e'
clientSecret = '543bc8ac7b5e49cc88966dc67119a34b'

var options = {
  url: 'https://oauth.fatsecret.com/connect/token',
  method: 'POST',
  auth: {
    user: clientID,
    password: clientSecret
  },
  headers: {'content-type': 'application/json'},
  form: {
    grant_type: 'client_credentials',
    scope: 'basic'
  },
  json: true
}

request(options, function(error, response, body) {
  if (error) throw new Error(error)
  var renewOptions = {
    url: 'https://api.heroku.com/apps/meal-prep-dojo/config-vars',
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer 94f590a8-d107-4ad9-a10c-c81180647878`,
      Accept: 'application/vnd.heroku+json; version=3'
    },
    json: {
      FAT_SECRET: body.access_token
    }
  }

  request(renewOptions, function(error, response, body) {
    if (error) throw new Error(error)

    console.log(response)
    console.log('Token renewed with success')
  })
})
