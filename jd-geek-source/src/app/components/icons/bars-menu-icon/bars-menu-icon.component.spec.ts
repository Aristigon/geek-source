import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarsMenuIconComponent } from './bars-menu-icon.component';

describe('BarsMenuIconComponent', () => {
  let component: BarsMenuIconComponent;
  let fixture: ComponentFixture<BarsMenuIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarsMenuIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarsMenuIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
