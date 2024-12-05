export const api = {
    getExample: 'example',
    getQr: '/qr/asistencia',
    postAutentication: '/qr/autenticacion',
    postSaveAsistencia: '/asistencia/guardar',
    postEliminarAsistencia: '/asistencia/eliminar',
    gettLoginEstudiante: '/estudiante/login',
    getAuthProfesor: '/profesor/login',
    getAsistenciaBuscarTodas: '/asistencia/buscar-todas',
    getCursosAsignadosProfesor: '/curso-profesor/asignados',
    getEstudiantesCurso: '/curso-estudiante/estudiante-curso',
    postCargarEstudianteCurso: '/curso-estudiante/cargar-estudiante-curso',
    postCargarEstudianteCursoExcel: '/curso-estudiante/cargar-estudiante-curso-excel',
    getIpPublica: '/api/ipify?format=json',
    getValidarIp: '/estudiante/validar-ip'
}