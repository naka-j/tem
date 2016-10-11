module.exports = {
  // 'database': 'mongodb://localhost/transcoster', // development
  'database': process.env.MONGOLAB_URI, // production(heroku mongoLab)
  'secret': 'oauthServerSampleSecret'
}
