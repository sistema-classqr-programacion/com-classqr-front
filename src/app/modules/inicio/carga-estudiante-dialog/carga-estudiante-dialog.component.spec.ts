import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaEstudianteDialogComponent } from './carga-estudiante-dialog.component';

describe('CargaEstudianteDialogComponent', () => {
  let component: CargaEstudianteDialogComponent;
  let fixture: ComponentFixture<CargaEstudianteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargaEstudianteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargaEstudianteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
