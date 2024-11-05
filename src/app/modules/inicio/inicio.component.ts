import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
})
export class InicioComponent {}
