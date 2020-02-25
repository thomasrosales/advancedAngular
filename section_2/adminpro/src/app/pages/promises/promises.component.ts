import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {
    this.countThree().then(
      () => console.log('Everything ok !')
    ).catch(error => console.error('Error: ', error));  

  }

  ngOnInit(): void {
  }

  countThree(): Promise<boolean>{
    let promise = new Promise<boolean>((resolve, reject) => {
      let count = 0;
      let interval = setInterval(() => {
        count += 1;
        if(count === 3){
          resolve(true);
          clearInterval(interval);
        }
      }, 1000);
    });

    return promise;
  }

}
