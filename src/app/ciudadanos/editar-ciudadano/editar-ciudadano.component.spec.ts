import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCiudadanoComponent } from './editar-ciudadano.component';

describe('EditarCiudadanoComponent', () => {
  let component: EditarCiudadanoComponent;
  let fixture: ComponentFixture<EditarCiudadanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarCiudadanoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCiudadanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
