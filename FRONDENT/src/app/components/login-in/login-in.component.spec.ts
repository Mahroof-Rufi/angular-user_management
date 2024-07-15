import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginINComponent } from './login-in.component';

describe('LoginINComponent', () => {
  let component: LoginINComponent;
  let fixture: ComponentFixture<LoginINComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginINComponent]
    });
    fixture = TestBed.createComponent(LoginINComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
