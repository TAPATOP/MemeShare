import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeContainerComponent } from './meme-container.component';

describe('MemeContainerComponent', () => {
  let component: MemeContainerComponent;
  let fixture: ComponentFixture<MemeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
