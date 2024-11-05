import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@sharedModule/service/auth.service';
import { UtilitiesService } from '@sharedModule/service/utilities.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, of, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  public urlLogo = '';

  constructor(private router:Router,
    private authService: AuthService,
    private utilitiesService: UtilitiesService,
    private spinner: NgxSpinnerService,
  ){}

  ngOnInit(): void {
    this.dataDefault()
  }

  dataDefault(){
    
  }

  logout() {
    this.spinner.show()
  }
  
}