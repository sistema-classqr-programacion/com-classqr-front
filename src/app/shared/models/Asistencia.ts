import { Curso } from "./Curso"
import { Estudiante } from "./Estudiante"
import { Profesor } from "./Profesor"
import { Qr } from "./Qr"

export class Asistencia{

    public codigoAsistencia?: string = ''

    public codigoEstudianteFk?: Estudiante | null = null

    public codigoProfesorFk?: Profesor | null = null

    public codigoCursoFk?: Curso | null = null

    public codigoQrFk?: Qr | null = null

    public ipEstudiante?: string = ''

    public fechaAsistencia?: Date | null = null

}