export class Login {
  usr: string;
  pwd: string;
  captcha: string;

  constructor(usr: string, pwd: string, captcha: string) {
    this.usr = usr;
    this.pwd = pwd;
    this.captcha=captcha;
  }
}
