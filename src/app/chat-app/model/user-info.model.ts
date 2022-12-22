export interface UserInfo {
    channelId: string;
    popupMessage: PopupMessage;
    user: User;
}

export interface PopupMessage {
    message: string;
} 

export interface User {
    id: string;
}

export interface Message {
    text: string;
    id: number;
    type: string;
    sender: boolean;
    isEditorActive: boolean;
    label: string;
    stepUid?: string;
}
export interface UserMessage {
    text: string;
    user: string;
}