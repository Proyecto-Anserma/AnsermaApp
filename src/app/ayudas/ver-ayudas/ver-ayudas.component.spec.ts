import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAyudasComponent } from './ver-ayudas.component';

describe('VerAyudasComponent', () => {
  let component: VerAyudasComponent;
  let fixture: ComponentFixture<VerAyudasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerAyudasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerAyudasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
