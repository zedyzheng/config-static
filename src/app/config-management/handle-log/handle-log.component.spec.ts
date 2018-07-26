import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleLogComponent } from './handle-log.component';

describe('HandleLogComponent', () => {
  let component: HandleLogComponent;
  let fixture: ComponentFixture<HandleLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandleLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandleLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
