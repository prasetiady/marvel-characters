export default () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  marvelAPI: {
    publicKey: process.env.MARVEL_API_PUBLIC_KEY,
    privateKey: process.env.MARVEL_API_PRIVATE_KEY,
  },
});
