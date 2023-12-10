import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistDetailComponent } from './dist-detail.component';

describe('DistDetailComponent', () => {
  let component: DistDetailComponent;
  let fixture: ComponentFixture<DistDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
