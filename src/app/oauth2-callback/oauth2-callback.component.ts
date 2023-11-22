import { Component } from '@angular/core';

@Component({
  selector: 'app-oauth2-callback',
  templateUrl: './oauth2-callback.component.html',
  styleUrls: ['./oauth2-callback.component.css']
})
export class Oauth2CallbackComponent {
  YOUR_CLIENT_ID = 'CLIENT_ID';
  YOUR_REDIRECT_URI = `${window.location.origin}/oauth2callback`;
  response: any;

  constructor() {
    var fragmentString = location.hash.substring(1);
    // Parse query string to see if page request is coming from OAuth 2.0 server.
    var params: { [key: string]: string } = {}; // Explicitly define the type of params object.
    var regex = /([^&=]+)=([^&]*)/g, m;
    while (m = regex.exec(fragmentString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    if (Object.keys(params).length > 0) {
      localStorage.setItem('oauth2-test-params', JSON.stringify(params));
      if (params['state'] && params['state'] == 'try_sample_request') {
        this.trySampleRequest();
      }
    }
  }

  // If there's an access token, try an API request.
  // Otherwise, start OAuth 2.0 flow.
  trySampleRequest() {
    const oauth2TestParams = localStorage.getItem('oauth2-test-params');
    var params = oauth2TestParams ? JSON.parse(oauth2TestParams) : null;
    if (params && params['access_token']) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET',
        'https://youtubeanalytics.googleapis.com/v2/reports?ids=channel%3D%3DMINE&startDate=2023-01-01&endDate=2024-01-01' +
        '&metrics=views&' +
        'access_token=' + params['access_token']);
      xhr.onreadystatechange = (e) => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.response);
          this.response = JSON.parse(xhr.response);
        } else if (xhr.readyState === 4 && xhr.status === 401) {
          // Token invalid, so prompt for user permission.
          this.oauth2SignIn();
        }
      };
      xhr.send(null);
    } else {
      this.oauth2SignIn();
    }
  }

  /*
   * Create form to request access token from Google's OAuth 2.0 server.
   */
  oauth2SignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create element to open OAuth 2.0 endpoint in new window.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
      'client_id': this.YOUR_CLIENT_ID,
      'redirect_uri': this.YOUR_REDIRECT_URI,
      'scope': 'https://www.googleapis.com/auth/yt-analytics.readonly',
      'state': 'try_sample_request',
      'include_granted_scopes': 'true',
      'response_type': 'token'
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', (params as any)[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
  }
}
