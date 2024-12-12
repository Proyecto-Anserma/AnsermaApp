import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesCiudadanoComponent } from './detalles-ciudadano.component';

describe('DetallesCiudadanoComponent', () => {
  let component: DetallesCiudadanoComponent;
  let fixture: ComponentFixture<DetallesCiudadanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesCiudadanoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesCiudadanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
