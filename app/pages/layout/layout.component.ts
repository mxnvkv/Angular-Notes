import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  styleUrls: ['./layout.component.sass'],
  template: `
    <div class="main">
      <div class="main-title">
        <h1>Angular Notes Application</h1>
      </div>
      
      <div class="main-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
