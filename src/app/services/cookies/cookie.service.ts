import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }

  public getCookie(name: string) {
    return this.unicodeToString((document.cookie.indexOf(name+'=') === -1 ? '' : ("; " + document.cookie).split('; '+name+'=')[1].split(';')[0]));
  }

  public unicodeToString(value: string): string{
		let convert: string = value.replace(new RegExp('\\\\u00e1', 'g'), 'á');
		convert = convert.replace(new RegExp('\\\\u00e9', 'g'), 'é');
		convert = convert.replace(new RegExp('\\\\u00ed', 'g'), 'í');
		convert = convert.replace(new RegExp('\\\\u00f3', 'g'), 'ó');
		convert = convert.replace(new RegExp('\\\\u00fa', 'g'), 'ú');
		convert = convert.replace(new RegExp('\\\\u00c1', 'g'), 'Á');
		convert = convert.replace(new RegExp('\\\\u00c9', 'g'), 'É');
		convert = convert.replace(new RegExp('\\\\u00cd', 'g'), 'Í');
		convert = convert.replace(new RegExp('\\\\u00d3', 'g'), 'Ó');
		convert = convert.replace(new RegExp('\\\\u00da', 'g'), 'Ú');
		convert = convert.replace(new RegExp('\\\\u00f1', 'g'), 'ñ');
		convert = convert.replace(new RegExp('\\\\u00d1', 'g'), 'Ñ');
		
		return convert;
	}

}
