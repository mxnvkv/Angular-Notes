import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.sass'],
  template: `
    <div>Project {{ title }} works!</div>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'Notes-Angular';
}
