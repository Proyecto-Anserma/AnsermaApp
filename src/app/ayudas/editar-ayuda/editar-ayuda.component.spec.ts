import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAyudaComponent } from './editar-ayuda.component';

describe('EditarAyudaComponent', () => {
  let component: EditarAyudaComponent;
  let fixture: ComponentFixture<EditarAyudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAyudaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
