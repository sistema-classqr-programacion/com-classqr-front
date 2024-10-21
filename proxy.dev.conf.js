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
    }

}