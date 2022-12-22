import { Component, OnInit } from '@angular/core';
import { ChatBotContants } from './constants/chatbot-constants';
import { Message, UserInfo, UserMessage } from './model/user-info.model';
import { ChatBotService } from './services/chatbot-component.service';
import { PusherService } from './services/pusher.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.less']
})
export class ChatBotComponent implements OnInit {
  hideChatIcon = false;
  logoImage = ChatBotContants.LOGO_IMAGE;
  greetMessage ="";
  userInfo: UserInfo = {} as any;
  messages: Array<Message>;
  userMessages: Array<UserMessage>;
  messageText: any;
  userName: any;
  channelId = "";

  constructor(private chatBotService: ChatBotService,
    private pusherService: PusherService) {
    this.userMessages = [];
    this.messages = [];
  }

  ngOnInit(): void {
    this.channelId = localStorage.getItem('channelId') || "";
    this.pusherService.messagesChannel.bind('client-widget-message', (message: any) => {
      this.userMessages.push(message);
    });
    if (!this.channelId) {
      this.getUser();
    } else {
      const userInfoStr = localStorage.getItem('userInfo') || "";
      this.userInfo = userInfoStr && JSON.parse(userInfoStr);
    }
  }

  /**
   * 
   */
  getUser(): void {
    this.chatBotService.getUser().subscribe(userDetail => {
      if (userDetail) {
        console.log(userDetail);
        localStorage.setItem('userInfo', JSON.stringify(userDetail));
        localStorage.setItem('userId', userDetail.user.id);
        localStorage.setItem('channelId', userDetail.channelId);
        this.userInfo = userDetail;
      }
    });
  }

  getMessageByChannel(): void {
    const channelId = localStorage.getItem('channelId') || "";
    const userId = localStorage.getItem('userId') || "";
    this.chatBotService.getMessagesByChannel(channelId, userId).subscribe(response => {
      if (response && response.messages && response.messages.length) {
        response.messages.forEach((item: any) => {
          const message: Message = {
            text: item.text,
            sender: false,
            type: item.type,
            isEditorActive: true,
            id: response.messages.length,
            label: 'Email',
            stepUid: item.stepUid
          };
          this.messages.push(message);
        });
      }
    });
  }

  /**
   * @method: openChatWidget()
   * @definition: Below method will trigger when user click on Chat launcher icon
   * @author: Savithiri Palanivelu
   * @date: 17-12-2022
   */
  openChatWidget(): void {
    this.hideChatIcon = true;
    this.getMessageByChannel();
  }

  /**
   * @method: closeChatWidget()
   * @definition: Below method will trigger when user click on close icon
   * @author: Savithiri Palanivelu
   * @date: 18-12-2022
   */
  closeChatWidget(): void {
    this.hideChatIcon = false;
  }
  
  sendMessage(user: string, text: string, messageData?: any) {
    const currentTime = new Date().getTime();
    const message: any = {
        channelName: this.channelId,
        display: {
          channelId: this.channelId,
          img: "https://staging1-uploads.insent.ai/insentstaging1/logo-insentstaging1-1649232340484?1649232340561",
          input: {
            key: "email", uid: this.userInfo.user.id, 
            type: "email", text: "Email",disabled: true, 
            validateDomains: true, value: text
          },
          lastMessageTimeStamp: currentTime,
          lead: false,
          name: "Test bot",
          stepUid: messageData.stepUid,
          time: currentTime,
          type: "input",
          userId: this.userInfo.user.id
        },
        message: {email: text, lastMessageTimeStamp: currentTime},
        senderId: this.userInfo.user.id,
        event: "client-widget-message"
    }
    this.pusherService.messagesChannel.trigger('client-widget-message', message);
    this.userMessages.push(message);
    
  }
}
