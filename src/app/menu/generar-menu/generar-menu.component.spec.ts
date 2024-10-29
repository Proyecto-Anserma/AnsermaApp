import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarMenuComponent } from './generar-menu.component';

describe('GenerarMenuComponent', () => {
  let component: GenerarMenuComponent;
  let fixture: ComponentFixture<GenerarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerarMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
