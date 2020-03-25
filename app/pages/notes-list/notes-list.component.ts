import { Component, OnInit } from '@angular/core';
import { NoteModel } from '../general/note.model';
import { NoteActionsService } from '../general/note-actions.service';

@Component({
  selector: 'app-notes-list',
  styleUrls: ['./notes-list.component.sass'],
  template: `
    <div class="notes-list-wrapper">
      <input type="text" class="search-input" placeholder="Search">

      <div class="items-list">
        <app-list-item 
          *ngFor="let note of notes; index as i" 
          [link]="i"
          [headerText]="note.title" 
          [bodyText]="note.content"
          (delete)="deleteNote(i)"
          ></app-list-item>
      </div>

      <button class="add-button" routerLink="new">Add note</button>
    </div>
  `
})
export class NotesListComponent implements OnInit {

  notes: NoteModel[] = new Array<NoteModel>();

  constructor(private notesService: NoteActionsService) { }

  ngOnInit(): void {
    this.notes = this.notesService.returnAllNotes();
  }

  deleteNote(id: number) {
    this.notesService.deleteNote(id);
  }

}
