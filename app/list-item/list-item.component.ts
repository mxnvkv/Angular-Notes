import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-item',
  styleUrls: ['./list-item.component.sass'],
  template: `
    <div #listItem class="list-item">
      
      <a [routerLink]="link">
        <div class="list-item-content">
          <h1>{{ headerText }}</h1>

          <div class="text-wrapper">
            <p>{{ bodyText }}<p>

            <div class="shadow"></div>
          </div>
        </div>
      </a>

      <div class="list-item-cross" (click)="crossClick()"></div>

    </div>
  `
})
export class ListItemComponent implements OnInit {

  @Input()
  headerText: string;
  
  @Input()
  bodyText: string;

  @Input()
  link: string;

  @Output('delete')
  deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {

  }

  crossClick() {
    this.deleteEvent.emit();
  }

}