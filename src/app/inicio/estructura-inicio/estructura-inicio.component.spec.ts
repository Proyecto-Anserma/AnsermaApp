import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuraInicioComponent } from './estructura-inicio.component';

describe('EstructuraInicioComponent', () => {
  let component: EstructuraInicioComponent;
  let fixture: ComponentFixture<EstructuraInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstructuraInicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstructuraInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
