; (function (_window) {
  let gTagIds = []
  try {
    gTagIds = JSON.parse('[' + '$GTAG_IDS' + ']')
  } catch (e) {
    console.log('Invalid GTagIds')
  }

  _window.__env = {
    environment: '$NODE_ENV',
    hasModules: !(['sec2030', 'inet', 'seguimoseducando'].includes('$NODE_ENV')),
    theme: '$THEME',
    production: '$PRODUCTION' === 'true',
    documentTitle: '$DOCUMENT_TITLE',
    projectName: 'front-tt',
    hmr: false,
    hotjarId: '$HOTJAR_ID',
    gcpapikey: '$GCP_API_KEY',
    gTagIds,
    keycloak: {
      config: {
        url: '$KEYCLOAK_ENDPOINT',
        realm: '$KEYCLOAK_REALM',
        clientId: 'front-tt',
      },
      bearerExcludedUrls: ["content.googleapis.com"],
    },
    apiEndpoint: '$API_ENDPOINT',
    chat: {
      host: '$XMPP_HOST',
      endpoint: '$XMPP_ENDPOINT',
    },
    s3: {
      key: '$S3_KEY',
      secret: '$S3_SECRET',
      region: '$S3_CDN_BUCKET_REGION',
      avatars: {
        bucket: '$S3_AVATARS_BUCKET_NAME',
        base: 'avatars'
      },
      cdn: {
        bucket: '$S3_CDN_BUCKET_NAME',
        base: '?'
      },
      attachments: {
        bucket: '$S3_CDN_BUCKET_NAME',
        base: 'public/attachments',
      },
      documentation: {
        bucket: '$S3_CDN_BUCKET_NAME',
        base: 'documentation'
      },
      homework: {
        bucket: '$S3_CDN_BUCKET_NAME',
        base: 'homework'
      }
    },
    stomp: {
      topic: '$AMQP_NOTIFICATIONS_TOPIC',
      config: {
        url: '$AMQP_NOTIFICATIONS_URL',
        headers: {
          login: '$AMQP_NOTIFICATIONS_USER',
          passcode: '$AMQP_NOTIFICATIONS_PASS',
        },
        heartbeat_in: 0,
        heartbeat_out: 20000,
        reconnect_delay: 5000,
        debug: '$PRODUCTION' !== 'true',
      },
    },
    domains: {
      tt: '$FRONT_TT',
      rm: '$FRONT_RM',
      scl: '$FRONT_SCL',
      eomt: '$FRONT_EOMT',
    },
    rollbar: {
      accessToken: '$ROLLBAR_TOKEN',
      captureUncaught: true,
      captureUnhandledRejections: true,
      environment: '$NODE_ENV',
    },
    skin: '$SKIN'
  }

  _window.dispatchEvent(new Event('[TICMAS] bootstrap'))
})(window)
