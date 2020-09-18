import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  name = 'Wizard';
  goingNext = false;
  finished = false;
  stepSaving = [{
    time: 3000,
    value: true
  },{
    time: 5000,
    value: true
  },{
    time: 1000,
    value: false
  }];
  stepSaving$;

  stepExit(): Promise<boolean> {
    this.goingNext = true;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 100);
    })
  }
  onFinished(): void {
    this.stepSaving$ = this.stepSaving.map((data, index) => {
      return Observable.create(function(observer) {
        observer.next({ state: 'saving', value: data.value });
        setTimeout(() => {
          observer.next({
            state: 'saved',
            value: data.value
          });
          observer.complete();
        }, data.time);
      })
    })
  }
}
