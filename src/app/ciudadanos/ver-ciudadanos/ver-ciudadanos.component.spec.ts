import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCiudadanosComponent } from './ver-ciudadanos.component';

describe('VerCiudadanosComponent', () => {
  let component: VerCiudadanosComponent;
  let fixture: ComponentFixture<VerCiudadanosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerCiudadanosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerCiudadanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
