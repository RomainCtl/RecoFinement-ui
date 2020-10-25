import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectConfirmationComponent } from './redirect-confirmation.component';

describe('RedirectConfirmationComponent', () => {
  let component: RedirectConfirmationComponent;
  let fixture: ComponentFixture<RedirectConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
