import { Injectable } from "@angular/core";
import Pusher from "pusher-js";
import { ChatBotContants } from "../constants/chatbot-constants";

@Injectable()
export class PusherService {
    pusher: any;
    messagesChannel: any;
    channelId = "";
    constructor() {
      this.channelId = localStorage.getItem("channelId") || "";
      this.pusher = new Pusher(ChatBotContants.PUSHER_KEY, {authEndpoint: "http://localhost:4200/"});

      this.messagesChannel = this.pusher.subscribe(this.channelId);
    }
  }