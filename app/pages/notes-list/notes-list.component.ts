import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NoteModel } from '../general/note.model';
import { NoteActionsService } from '../general/note-actions.service';
import { element } from 'protractor';

@Component({
  selector: 'app-notes-list',
  styleUrls: ['./notes-list.component.sass'],
  template: `
    <div class="notes-list-wrapper">
      <input #filterInput type="text" (keyup)="filter($event.target.value)" class="search-input" placeholder="Search">

      <div class="items-list">
        <app-list-item 
          *ngFor="let note of filteredNotes;" 
          [link]="generateNoteURL(note)"
          [headerText]="note.title" 
          [bodyText]="note.content"
          (delete)="deleteNote(note)"
           ></app-list-item>
      </div>

      <button class="add-button" routerLink="new">Add note</button>
    </div>
  `
})
export class NotesListComponent implements OnInit {

  notes: NoteModel[] = new Array<NoteModel>();
  filteredNotes: NoteModel[] = new Array<NoteModel>();

  @ViewChild('filterInput')
  filterInputRef: ElementRef<HTMLInputElement>;

  constructor(private notesService: NoteActionsService) { }

  ngOnInit(): void {
    this.notes = this.notesService.returnAllNotes();
    // this.filteredNotes = this.notesService.returnAllNotes();
    this.filter('');
  }

  deleteNote(note: NoteModel) {
    let noteId = this.notesService.getId(note);
    this.notesService.deleteNote(noteId);
    this.filter(this.filterInputRef.nativeElement.value);
  }

  generateNoteURL(note: NoteModel) {
    let noteId = this.notesService.getId(note);
    return noteId;
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

    // sorting by relevancy
    this.sortByRelevancy(allResults);
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

  sortByRelevancy(searchResults: NoteModel[]) {
    let noteCountObject = {}; // key:value => NoteId:number ( note obj id : count )

    searchResults.forEach(note => {
      let noteId = this.notesService.getId(note);

      if(noteCountObject[noteId]) {
        noteCountObject[noteId] += 1;
      } else {
        noteCountObject[noteId] = 1;
      }
    })

    this.filteredNotes = this.filteredNotes.sort((a: NoteModel, b: NoteModel) => {
      let aId = this.notesService.getId(a);
      let bId = this.notesService.getId(b);

      let aCount = noteCountObject[aId];
      let bCount = noteCountObject[bId];

      return bCount - aCount;
    })
  }
}
