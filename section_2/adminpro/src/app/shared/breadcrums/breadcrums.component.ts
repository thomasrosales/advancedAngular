import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
export class BreadcrumsComponent implements OnInit {


  title: string;

  constructor(private router : Router, private titleClass: Title, private meta: Meta) {
    this.getDataRoute().subscribe(response => {
      console.log(response);
      this.title = response.title;
      this.titleClass.setTitle(this.title);
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.title 
      };
      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit(): void {
  }

  getDataRoute(){
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => {
        return event.snapshot.data;
      }));
  }

}
