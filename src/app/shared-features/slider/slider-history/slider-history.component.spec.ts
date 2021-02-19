import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderHistoryComponent } from './slider-history.component';

describe('SliderHistoryComponent', () => {
  let component: SliderHistoryComponent;
  let fixture: ComponentFixture<SliderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
