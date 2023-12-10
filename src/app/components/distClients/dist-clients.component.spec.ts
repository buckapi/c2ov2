import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistClientsComponent } from './dist-clients.component';

describe('DistClientsComponent', () => {
  let component: DistClientsComponent;
  let fixture: ComponentFixture<DistClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistClientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
