import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeCreatorComponent } from './meme-creator.component';

describe('MemeCreatorComponent', () => {
  let component: MemeCreatorComponent;
  let fixture: ComponentFixture<MemeCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemeCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
