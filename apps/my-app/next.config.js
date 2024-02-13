const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'my-app',
          filename: 'remoteEntry.js',
          remotes: {
            settings:
              'settings@https://d3dgo17bvznzj1.cloudfront.net/remoteEntry.js',
          },
          extraOptions: {},
        })
      );
    }
    return config;
  },
  i18n: {
    locales: ['en', 'zh-CN', 'zh-HK'],
    defaultLocale: 'en',
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
