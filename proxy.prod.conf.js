module.exports = {
   "/api/v1/qr/*": {
        "target": "https://qr-ms-e2edcrahf7ave8ar.mexicocentral-01.azurewebsites.net/api/v1/qr/",
        "secure": false,
        "logLevel": "debug",
        "pathRewrite": {
          "^/api/v1/qr/": ""
        }
    },
    "/api/v1/asistencia/*": {
      "target": "https://qr-ms-e2edcrahf7ave8ar.mexicocentral-01.azurewebsites.net/api/v1/asistencia/",
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
        "^/api/v1/asistencia/": ""
      }
    },
    "/api/v1/estudiante/*": {
      "target": "https://estudiante-ms-d5ezc7afbgfah7ac.mexicocentral-01.azurewebsites.net/api/v1/estudiante/",
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
        "^/api/v1/estudiante/": ""
      }
    },
    "/api/v1/profesor/*": {
      "target": "https://profesor-ms-dte8d3efgeczcudu.mexicocentral-01.azurewebsites.net/api/v1/profesor/",
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
        "^/api/v1/profesor/": ""
      }
    },
    "/api/v1/curso-profesor/*": {
      "target": "https://profesor-ms-dte8d3efgeczcudu.mexicocentral-01.azurewebsites.net/api/v1/curso-profesor/",
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
        "^/api/v1/curso-profesor/": ""
      }
    },
    "/api/v1/curso-estudiante/*": {
      "target": "https://estudiante-ms-d5ezc7afbgfah7ac.mexicocentral-01.azurewebsites.net/api/v1/curso-estudiante/",
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