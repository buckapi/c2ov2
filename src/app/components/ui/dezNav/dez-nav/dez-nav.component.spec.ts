import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DezNavComponent } from './dez-nav.component';

describe('DezNavComponent', () => {
  let component: DezNavComponent;
  let fixture: ComponentFixture<DezNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DezNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DezNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
