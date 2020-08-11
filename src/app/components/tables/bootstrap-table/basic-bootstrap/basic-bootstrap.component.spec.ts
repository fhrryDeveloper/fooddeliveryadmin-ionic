import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicBootstrapComponent } from './basic-bootstrap.component';

describe('BasicBootstrapComponent', () => {
  let component: BasicBootstrapComponent;
  let fixture: ComponentFixture<BasicBootstrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicBootstrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
