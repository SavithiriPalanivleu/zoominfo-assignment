import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { ChatBotService } from './services/chatbot-component.service';
import { FormsModule } from '@angular/forms';
import { PusherService } from './services/pusher.service';

@NgModule({
  declarations: [
    AppComponent
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
