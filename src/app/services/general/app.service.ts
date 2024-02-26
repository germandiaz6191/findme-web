import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  configUrl = `assets/app.config.json`;
  private configSettings: any = null;

  get settings() {
    return this.configSettings;
  }

  public load(): Promise<any> {
      return new Promise((resolve, reject) => {
        this.http.get(this.configUrl).subscribe((response: any) => {
          console.log(reject);
          this.configSettings = response;
            resolve(true);
      });
    });
  }
}
