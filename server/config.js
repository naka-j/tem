module.exports = {
  // 'database': 'mongodb://localhost/transcoster', // development
  // 'database': 'mongodb://transcoster:transcostertranscoster@ds055626.mlab.com:55626/heroku_g0jvjd03', // production(heroku mongoLab)
  'database': process.env.MONGODB_URI, // production(heroku mongoLab)
  'secret': 'oauthServerSampleSecret',
  'nodeEnv': process.env.NODE_ENV || 'development'
}
