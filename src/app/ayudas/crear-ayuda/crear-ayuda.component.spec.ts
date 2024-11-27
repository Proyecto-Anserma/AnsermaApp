import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAyudaComponent } from './crear-ayuda.component';

describe('CrearAyudaComponent', () => {
  let component: CrearAyudaComponent;
  let fixture: ComponentFixture<CrearAyudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAyudaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
