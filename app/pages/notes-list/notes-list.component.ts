import { Component, OnInit } from '@angular/core';
import { NoteModel } from '../general/note.model';
import { NoteActionsService } from '../general/note-actions.service';
import { element } from 'protractor';

@Component({
  selector: 'app-notes-list',
  styleUrls: ['./notes-list.component.sass'],
  template: `
    <div class="notes-list-wrapper">
      <input type="text" (input)="filter($event.target.value)" class="search-input" placeholder="Search">
      <div class="items-list">
        <app-list-item 
          *ngFor="let note of filteredNotes; index as i" 
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
  filteredNotes: NoteModel[] = new Array<NoteModel>();

  constructor(private notesService: NoteActionsService) { }

  ngOnInit(): void {
    this.notes = this.notesService.returnAllNotes();
    this.filteredNotes = this.notes;
  }

  deleteNote(id: number) {
    this.notesService.deleteNote(id);
  }

  filter(query: string) {
    query = query.toLowerCase().trim();

    let allResults: NoteModel[] = new Array<NoteModel>();
    // split up rhe search query into words
    let terms: string[] = query.split(' ');
    // remove dublicates
    terms = this.removeDublicates(terms);
    // compile all relevant results into allResults array
    terms.forEach(term => {
      let results: NoteModel[] = this.relevantNotes(term);
      // append to the allResults array
      allResults = [...allResults, ...results];
    });

    // allResults will include dublicate notes, but we won't show dublicate notes on the UI
    let uniqueResults = this.removeDublicates(allResults);
    this.filteredNotes = uniqueResults;
  }

  removeDublicates(arr: Array<any>): Array<any> {
    let uniqueResults: Set<any> = new Set<any>();
    // loop through the array and add items to the set
    arr.forEach(e => uniqueResults.add(e));

    return Array.from(uniqueResults);
  }

  relevantNotes(query: string): Array<NoteModel> {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(note => {
      if (note.title && note.title.toLowerCase().includes(query)) {
        return true;
      }

      if (note.content && note.content.toLowerCase().includes(query)) {
        return true;
      }

      return false;
    })

    return relevantNotes;
  }
}
