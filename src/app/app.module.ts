import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { ChatBotComponent } from './chat-app/chatbot.component';
import { ChatBotService } from './chat-app/services/chatbot-component.service';
import { PusherService } from './chat-app/services/pusher.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatBotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ChatBotService, PusherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
