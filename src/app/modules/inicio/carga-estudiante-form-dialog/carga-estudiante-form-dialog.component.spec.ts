import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaEstudianteFormDialogComponent } from './carga-estudiante-form-dialog.component';

describe('CargaEstudianteFormDialogComponent', () => {
  let component: CargaEstudianteFormDialogComponent;
  let fixture: ComponentFixture<CargaEstudianteFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargaEstudianteFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargaEstudianteFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
