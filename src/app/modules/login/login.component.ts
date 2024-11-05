import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from '../../shared/service/errorHandler.service';
import { AuthService } from '../../shared/service/auth.service';
import { catchError, finalize, of, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { SubjectService } from '@sharedModule/service/subjectService.service';
import { Base64Service } from '@sharedModule/service/base64.service';
import {jwtDecode} from 'jwt-decode'
import { Router } from '@angular/router';
import { LoginProfesor } from '@sharedModule/models/LoginProfesor';
import { AuthResponse } from '@sharedModule/models/AuthResponse';
import { RespuestaGeneral } from '@sharedModule/models/RespuestaGeneral';
import { ProfesorToken } from '@sharedModule/models/ProfesorToken';
import { HttpError } from '@sharedModule/models/http-error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  public hide = true;
  public formLogin!:FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    public readonly errorHandlerService: ErrorHandlerService,
    private authService:AuthService,
    private base64Service: Base64Service,
    private subjectService: SubjectService,
    private utilitiesService: UtilitiesService,
    private spinner: NgxSpinnerService,
    private router:Router
  ){}

  onRegisterUser(){
      this.router.navigate(['/registrar'])
  }

  ngOnInit(): void {
    this.buildFormLogin();
  }

  buildFormLogin(): void {
    this.formLogin = this.formBuilder.group({
      numeroDocumento: new FormControl<string>('', [
        Validators.required
      ]
      ),
      password: new FormControl('', [
        Validators.required,
        // Validators.pattern(StrongPasswordRegx)
      ])
    });
  }

  public loginUser({valid}:{valid:boolean}){
    if(!valid){
      this.formLogin.markAllAsTouched();
      return;
    }
    let mensaje = ''
    const {numeroDocumento, password} = this.formLogin.value
    const objectUsuario:LoginProfesor = {
      numeroDocumento:numeroDocumento,
      password: password
    }
    sessionStorage.removeItem('userToken');
    this.spinner.show(); // Show Spinner
    let succes = false;
    this.authService.loginProfesor(objectUsuario).pipe(
      tap((data:RespuestaGeneral) => {
          const token:AuthResponse = data.data as AuthResponse;
          let profesorData:ProfesorToken = jwtDecode(token.token);
          const obj64 = this.base64Service.objectoToBase64(profesorData)
          this.subjectService.setValueBase64(obj64);
          mensaje = data.message
          succes = true
      }),
      catchError((err:HttpError) => {
        console.error("Error pipe: ", err);
        this.utilitiesService.showErrorMessage(err.message)
        this.spinner.hide()
        return of(null)
      }),
      finalize(() => {
        if(succes){
          this.spinner.hide().then(() => {
            this.utilitiesService.showSucessMessage(mensaje, 'inicio-sesion', 'Aceptar').then(() => {
              this.router.navigate(['/inicio']);
            });
          });
        }
        this.spinner.hide()
      } ) // Hiden Spinner
    ).subscribe({
      error:(error) => {
        console.log(error)
        this.spinner.hide()
      }
    });
  }

}