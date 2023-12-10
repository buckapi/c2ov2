import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistnewComponent } from './distnew.component';

describe('DistnewComponent', () => {
  let component: DistnewComponent;
  let fixture: ComponentFixture<DistnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistnewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
