import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  setting: Setting = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default'
  }

  constructor(@Inject(DOCUMENT) private _document) {
    this.setSettings();
  }

  saveSettings(){
    localStorage.setItem('settings', JSON.stringify(this.setting));
  }

  setSettings(){
    if(localStorage.getItem('settings')){
      this.setting = JSON.parse(localStorage.getItem('settings'));
      this.applySettings(this.setting.theme);
    }
  }

  applySettings(colorTheme: string){
    let url = `assets/css/colors/${colorTheme}.css`;
    this._document.getElementById('theme').setAttribute('href', url);
    this.setting.theme = colorTheme;
    this.setting.themeUrl = url;
    this.saveSettings();
  }
}

interface Setting {
  themeUrl: string;
  theme: string;
}