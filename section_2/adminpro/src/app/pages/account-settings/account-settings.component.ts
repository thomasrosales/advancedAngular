import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/settings.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private _document, public settings: SettingsService ) { }

  ngOnInit(): void {
    this.applyCheckMark();
  }

  changeColor(colorTheme: string, link: ElementRef){
    this.checkMark(link);
    this.settings.applySettings(colorTheme);
  }

  checkMark(link: any){
    let selector: any = document.getElementsByClassName('selector');
    for(let element of selector){
      element.classList.remove('working');
    }
    link.classList.add('working');
  }

  applyCheckMark(){
    let selector: any = document.getElementsByClassName('selector');
    let theme = this.settings.setting.theme;
    
    for(let element of selector){
      if(element.getAttribute('data-theme') === theme){
        element.classList.add('working');
        break;
      }
    }
  }

}
