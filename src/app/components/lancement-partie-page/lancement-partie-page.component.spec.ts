import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancementPartiePageComponent } from './lancement-partie-page.component';

describe('LancementPartiePageComponent', () => {
  let component: LancementPartiePageComponent;
  let fixture: ComponentFixture<LancementPartiePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancementPartiePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LancementPartiePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
