import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { QrService } from '@sharedModule/service/qr.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'app-pantalla-qr',
  templateUrl: './pantalla-qr.component.html',
  styleUrls: ['./pantalla-qr.component.scss']
})
export class PantallaQrComponent {

  qrCodeImage: SafeUrl | null = null;
  qrCodeBlob: Blob | null = null;  // Guardar el blob para la descarga

  constructor(
    private qrService: QrService, 
    private utilitiesService: UtilitiesService,
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadQRCode();
  }

  loadQRCode(): void {
    this.spinner.show()
    this.qrService.generarQr().pipe(
      tap((objeto: Blob) => {
        const objectURL = URL.createObjectURL(objeto);
        this.qrCodeImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.qrCodeBlob = objeto;  // Guardar el blob para la descarga
      }),
      catchError((err) => {
        console.error("Error: ", err);
        this.utilitiesService.showErrorMessage(err.message);
        this.spinner.hide();
        return of(null);
      }),
      finalize(() => {
        this.spinner.hide();
      })
    ).subscribe();
  }

  // Método para descargar el QR
  downloadQRCode(): void {
    if (this.qrCodeBlob) {
      const link = document.createElement('a');
      const url = URL.createObjectURL(this.qrCodeBlob);
      link.href = url;
      link.download = 'qr-code.png';  // Nombre del archivo a descargar
      document.body.appendChild(link);  // Asegúrate de agregar el enlace al DOM
      link.click();
      document.body.removeChild(link);  // Remover el enlace del DOM después de la descarga
      URL.revokeObjectURL(url);  // Liberar el objeto URL después de usarlo
    } else {
      console.error("No QR code available for download");
    }
  }
}
