import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  
  subcription: Subscription;

  constructor() {
    //this.returnObs().pipe(retry(2)).subscribe(response => {
    this.subcription = this.returnObs().pipe(retry(2)).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    }, () => {
      console.log('Termino');
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  returnObs(): Observable<any>{
    return new Observable(observer => {
      let count:number = 0;
      let interval = setInterval(() => {
        count += 1;

        let out: Out = {
          value: count
        };

        observer.next( out );

        /*if(count === 3){
          clearInterval(interval);
          observer.complete();
        }*/

       /* if(count === 2){
          clearInterval(interval);
          observer.error('Error !');
        }*/
      }, 1000);
    }).pipe(
      map((response: Out) => response.value),
      filter((value, index) => {
        if( (value%2) === 1 ){
          return true;
        }
        return false;
      }));
  }
}

interface Out{
  value: number;
}
