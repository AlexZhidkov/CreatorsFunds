import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class YouTubeDataService {

  constructor(private http: HttpClient) { }

  getChannelInfo(channelId: string): Observable<any> {
    const apiKey = 'KEY';
    const params = new HttpParams({ fromString: `part=snippet,contentDetails,statistics&id=${channelId}&key=${apiKey}` });
    return this.http.request('GET', 'https://www.googleapis.com/youtube/v3/channels', { responseType: 'json', params });
  }

}
