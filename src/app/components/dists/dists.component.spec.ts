import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistsComponent } from './dists.component';

describe('DistsComponent', () => {
  let component: DistsComponent;
  let fixture: ComponentFixture<DistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
