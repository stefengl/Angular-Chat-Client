import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageHistoryComponent } from './chat-message-history.component';

describe('ChatMessageHistoryComponent', () => {
  let component: ChatMessageHistoryComponent;
  let fixture: ComponentFixture<ChatMessageHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatMessageHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
