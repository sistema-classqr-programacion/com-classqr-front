import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { GenerarQr } from '@sharedModule/models/GenerarQr';
import { QueryQr } from '@sharedModule/models/QueryQr';
import { QrService } from '@sharedModule/service/qr.service';
import { SubjectService } from '@sharedModule/service/subjectService.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pantalla-qr',
  templateUrl: './pantalla-qr.component.html',
  styleUrls: ['./pantalla-qr.component.scss'],
})
export class PantallaQrComponent {
  qrCodeImage: SafeUrl | null = null;
  qrCodeBlob: Blob | null = null; // Guardar el blob para la descarga

  constructor(
    private qrService: QrService,
    private utilitiesService: UtilitiesService,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer,
    private subject:SubjectService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.loadQRCode();
    })
  }

  loadQRCode(): void {
    this.spinner.show();
    const token = sessionStorage.getItem("userToken")
    let  tokenSession = ''
    if(token){
      tokenSession = jwtDecode(token)
    }
    const codigoCurso = this.subject.getValue()
    let codigoProfesor = ''
    if(tokenSession && typeof tokenSession ==  'object' && 'codigoProfesor' in tokenSession){
       codigoProfesor = tokenSession['codigoProfesor']
    }
    const queryQr: QueryQr = {
      codigoCurso: codigoCurso,
      codigoProfesor: codigoProfesor
    };
    this.qrService
    .generarQr(queryQr)
    .pipe(
      tap((objeto: GenerarQr) => {
        console.log('Contenido del Base64 recibido:', objeto.imagen);

        // Decodificamos el Base64 a un array de bytes y lo convertimos en un Blob
        const byteCharacters = atob(objeto.imagen); // Decodifica el Base64
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        const blob: Blob = new Blob([byteArray], { type: 'image/png' }); // Creamos el blob con el tipo correcto
        const objectURL = URL.createObjectURL(blob);

        console.log('Blob creado:', blob);
        console.log('URL creada para el QR:', objectURL);

        // Sanitizamos la URL antes de asignarla
        this.qrCodeImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.qrCodeBlob = blob;

        // Guardamos el código QR en sessionStorage
        sessionStorage.setItem('codigoQr', objeto.codigo);
      }),
      catchError((err) => {
        console.error('Error: ', err);
        this.utilitiesService.showErrorMessage(err.message);
        this.spinner.hide();
        return of(null);
      }),
      finalize(() => {
        this.spinner.hide();
      })
    )
    .subscribe();
  }

  // Método para descargar el QR
  downloadQRCode(): void {
    if (this.qrCodeBlob) {
      const link = document.createElement('a');
      const url = URL.createObjectURL(this.qrCodeBlob);
      link.href = url;
      link.download = 'qr-code.png'; // Nombre del archivo a descargar
      document.body.appendChild(link); // Asegúrate de agregar el enlace al DOM
      link.click();
      document.body.removeChild(link); // Remover el enlace del DOM después de la descarga
      URL.revokeObjectURL(url); // Liberar el objeto URL después de usarlo
    } else {
      console.error('No QR code available for download');
    }
  }
}
