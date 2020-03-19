import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  styleUrls: ['./list-item.component.sass'],
  template: `
    <div class="list-item">
      <div class="list-item-cross"></div>

      <div class="list-item-content">
        <h1>{{ headerText }}</h1>

        <div class="text-wrapper">
          <p>{{ bodyText }}<p>

          <div class="shadow"></div>
        </div>

      </div>
    </div>
  `
})
export class ListItemComponent implements OnInit {

  @Input()
  headerText: string;
  
  @Input()
  bodyText: string;

  constructor() { }

  ngOnInit(): void {

  }

}