import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiUrlConstant } from "../constants/api-url.constants";

@Injectable()
export class ChatBotService {
    constructor(private http: HttpClient){}

    /**
     * @method: getUser()
     * @definition: This method used to get the user id and channel id
     * @author: Savithiri Palanivelu
     * @date: 18-12-2022
     * @returns UserInfo
     */
    getUser(): Observable<any> {
        const url = ApiUrlConstant.GET_USER_URL;
        return this.http.get(url, this.getHeaders());
    }

    getMessagesByChannel(channelId: string, userId: string): Observable<any> {
        const url = ApiUrlConstant.GET_MESSAGE + channelId;
        return this.http.get(url, this.getHeaders(userId));
    }

    getHeaders(userId?: string) {
        if (userId) {
            return {headers: new HttpHeaders()
                .set('Authorization',  `Bearer C6RZpH3Ym4HphfpKHmHD`)
                .set('userid', userId)};
        } else {
            return {headers: new HttpHeaders()
                .set('Authorization',  `Bearer C6RZpH3Ym4HphfpKHmHD`)};
        }
    }
}