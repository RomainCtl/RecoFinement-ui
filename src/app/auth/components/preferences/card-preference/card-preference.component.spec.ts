import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPreferenceComponent } from './card-preference.component';

describe('CardPreferenceComponent', () => {
  let component: CardPreferenceComponent;
  let fixture: ComponentFixture<CardPreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardPreferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
