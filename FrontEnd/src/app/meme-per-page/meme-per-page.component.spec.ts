import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemePerPageComponent } from './meme-per-page.component';

describe('MemePerPageComponent', () => {
  let component: MemePerPageComponent;
  let fixture: ComponentFixture<MemePerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemePerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemePerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
