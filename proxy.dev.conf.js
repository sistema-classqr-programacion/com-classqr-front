module.exports = {
   "/api/v1/qr/*": {
        "target": "http://localhost:8001/api/v1/qr/",
        "secure": false,
        "logLevel": "debug",
        "pathRewrite": {
          "^/api/v1/qr/": ""
        }
    },
    "/api/v1/asistencia/*": {
      "target": "http://localhost:8001/api/v1/asistencia/",
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
        "^/api/v1/asistencia/": ""
      }
    },
    "/api/v1/estudiante/*": {
      "target": "http://localhost:8003/api/v1/estudiante/",
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
        "^/api/v1/estudiante/": ""
      }
    },
    "/api/v1/profesor/*": {
      "target": "http://localhost:8004/api/v1/profesor/",
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
        "^/api/v1/profesor/": ""
      }
    },
    "/api/v1/curso-profesor/*": {
      "target": "http://localhost:8004/api/v1/curso-profesor/",
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
        "^/api/v1/curso-profesor/": ""
      }
    },
    "/api/v1/curso-estudiante/*": {
      "target": "http://localhost:8003/api/v1/curso-estudiante/",
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
        "^/api/v1/curso-estudiante/": ""
      }
    },
    "/api/ipify": { // Nueva entrada para ipify
      "target": "https://api.ipify.org",
      "secure": true,
      "changeOrigin": true,
      "logLevel": "debug",
      "pathRewrite": {
        "^/api/ipify": ""
      }
    }
}