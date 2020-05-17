export default {
  jwt: {
    expiresIn: '7d',
    secret: process.env.APP_SECRET || 'secret',
  },
};
