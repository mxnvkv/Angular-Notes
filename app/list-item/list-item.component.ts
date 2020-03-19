import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item',
  styleUrls: ['./list-item.component.sass'],
  template: `
    <div class="list-item">
      <div class="list-item-content">
        <h1>Heading</h1>

        <p>
          Lorem ipsum dolor sit amet  
        <p>
      </div>
    </div>
  `
})
export class ListItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
