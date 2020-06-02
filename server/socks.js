const Socks = require('socks')

const fixieUrl =
  process.env.NODE_ENV === 'production' ? process.env.FIXIE_SOCKS_HOST : ''
const fixieValues =
  process.env.NODE_ENV === 'production'
    ? fixieUrl.split(new RegExp('[/(:\\/@)/]+'))
    : ''

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

module.exports = socksAgent
