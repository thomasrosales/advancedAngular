import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private _document ) { }

  ngOnInit(): void {
  }

  changeColor(colorTheme: string, link: ElementRef){
    this.checkMark(link);
    let url = `assets/css/colors/${colorTheme}.css`;
    this._document.getElementById('theme').setAttribute('href', url);
  }

  checkMark(link: any){
    let selector: any = document.getElementsByClassName('selector');
    for(let element of selector){
      element.classList.remove('working');
    }
    link.classList.add('working');
  }

}
