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

  constructor(private chatBotService: ChatBotService,
    private pusherService: PusherService) {
    this.userMessages = [];
    this.messages = [];
  }

  ngOnInit(): void {
    const IsUserExist = localStorage.getItem('channelId');
    this.pusherService.messagesChannel.bind('client-my-event', (message: any) => {
      this.userMessages.push(message);
    });
    if (!IsUserExist) {
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
            label: 'Email'
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
  
  sendMessage(user: string, text: string) {
    const message: UserMessage = {
       user: user,
       text: text,
    }
    this.pusherService.messagesChannel.trigger('client-my-event', message);
    this.userMessages.push(message);
    
  }
}
