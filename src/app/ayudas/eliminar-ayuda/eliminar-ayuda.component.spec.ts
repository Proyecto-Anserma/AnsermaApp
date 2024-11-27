import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAyudaComponent } from './eliminar-ayuda.component';

describe('EliminarAyudaComponent', () => {
  let component: EliminarAyudaComponent;
  let fixture: ComponentFixture<EliminarAyudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarAyudaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
