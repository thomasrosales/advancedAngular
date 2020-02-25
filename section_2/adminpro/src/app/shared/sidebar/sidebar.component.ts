import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/settings.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public sidebarServide: SidebarService) { }

  ngOnInit(): void {
  }

}
