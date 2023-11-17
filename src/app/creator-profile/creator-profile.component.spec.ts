import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorProfileComponent } from './creator-profile.component';

describe('CreatorProfileComponent', () => {
  let component: CreatorProfileComponent;
  let fixture: ComponentFixture<CreatorProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatorProfileComponent]
    });
    fixture = TestBed.createComponent(CreatorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
