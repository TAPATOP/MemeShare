import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeSubmitterComponent } from './meme-submitter.component';

describe('MemeSubmitterComponent', () => {
  let component: MemeSubmitterComponent;
  let fixture: ComponentFixture<MemeSubmitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemeSubmitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeSubmitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
