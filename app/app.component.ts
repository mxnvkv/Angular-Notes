import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.sass'],
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Notes-Angular';
}
