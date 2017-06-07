import { AuthenticationService } from './authentication.service';
import { WebsocketService } from './websocket.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GreetingComponent } from './greeting/greeting.component';
import { ChatComponent } from './chat/chat.component';
import { ChatMessageHistoryComponent } from './chat-message-history/chat-message-history.component';
import { ChatRoomDisplayComponent } from './chat-room-display/chat-room-display.component';
import { ChatParticipantsComponent } from './chat-participants/chat-participants.component';
import { RegistrierenComponent } from './registrieren/registrieren.component';
import {MdGridListModule} from '@angular/material';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegistrierenComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GreetingComponent,
    ChatComponent,
    ChatMessageHistoryComponent,
    ChatRoomDisplayComponent,
    ChatParticipantsComponent,
    RegistrierenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdGridListModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthenticationService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
