const withNoServer = require('@next/next-no-server')();

module.exports = withNoServer({
  output: 'export',
  reactStrictMode: true,
});
