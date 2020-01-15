import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardingListComponent } from './boarding-list.component';

describe('BoardingListComponent', () => {
  let component: BoardingListComponent;
  let fixture: ComponentFixture<BoardingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
