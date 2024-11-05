import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaQrComponent } from './pantalla-qr.component';

describe('PantallaQrComponent', () => {
  let component: PantallaQrComponent;
  let fixture: ComponentFixture<PantallaQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantallaQrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PantallaQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
