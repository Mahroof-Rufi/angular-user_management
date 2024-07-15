import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditUserComponent } from './admin-edit-user.component';

describe('AdminEditUserComponent', () => {
  let component: AdminEditUserComponent;
  let fixture: ComponentFixture<AdminEditUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditUserComponent]
    });
    fixture = TestBed.createComponent(AdminEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
