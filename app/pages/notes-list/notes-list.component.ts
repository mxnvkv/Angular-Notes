import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-list',
  styleUrls: ['./notes-list.component.sass'],
  template: `
    <div class="notes-list-wrapper">
      <input type="text" class="search-input" placeholder="Search">

      <div class="items-list">
        <app-list-item [headerText]="'this is header'" [bodyText]="'this is body'"></app-list-item>
      </div>
      
      <!-- <div class="container-box"></div>
      <div class="container-box"></div>
      <div class="container-box"></div>
      <div class="container-box"></div>
      <div class="container-box"></div> -->
    </div>
  `
})
export class NotesListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
