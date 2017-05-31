import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRoomDisplayComponent } from './chat-room-display.component';

describe('ChatRoomDisplayComponent', () => {
  let component: ChatRoomDisplayComponent;
  let fixture: ComponentFixture<ChatRoomDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatRoomDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRoomDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
