import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// TODO - Consider making converting this service to a guard.
export class LoginService {
  private uri: string;

  constructor(private http: HttpClient) {
    this.uri = 'https://skynot.intelliacc.com/ws_IntelliCoffee/Service.asmx';
  }

  /**
   * Attempts authentication against the login endpoint.
   * 
   * @param username The username as entered by the user.
   * @param password The password as entered by the user.
   */
  public login(username: string, password: string) {
    const body = `<?xml version="1.0" encoding="utf-8"?>
    <soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
    <soap12:Body>
    <Login xmlns="http://tempuri.org/">
    <username>${username}</username>
    <password>${password}</password>
    </Login>
    </soap12:Body>
    </soap12:Envelope>`;

    const headers = new HttpHeaders({'Content-Type': 'application/soap+xml'});

    return this.http.post(this.uri, body, {responseType: 'text', headers})
      .pipe(map((response) => {
        return this.parseSoapAuthenticationStatus(response);
      }), retry(5));
  }

  /**
   * Parse the given XML response to get the authentication status.
   * 
   * @param response The XML response from the authentication endpoint.
   */
  private parseSoapAuthenticationStatus(response: string) {
    let authenticated: boolean = false;
    const xml = new DOMParser().parseFromString(response, 'text/xml');
    const tags =  xml.getElementsByTagName('LoginResult');

    for (let i = 0; i < tags.length; i++) {
      if (tags[i].parentNode.nodeName === 'LoginResponse') {
        authenticated = (tags[i].textContent.toUpperCase() === 'TRUE');
        break;
      }
    }
    return authenticated;
  }
}
