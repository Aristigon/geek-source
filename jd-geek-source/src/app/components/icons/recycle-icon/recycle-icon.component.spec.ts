import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecycleIconComponent } from './recycle-icon.component';

describe('RecycleIconComponent', () => {
  let component: RecycleIconComponent;
  let fixture: ComponentFixture<RecycleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecycleIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecycleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
