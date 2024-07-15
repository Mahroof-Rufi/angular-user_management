import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { initialAdd } from './services/store/users.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private store:Store) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('stateData');
    if (userData) {
      this.store.dispatch(initialAdd({ data: userData }));
    }
  }
  title = 'FRONDENT';


}
