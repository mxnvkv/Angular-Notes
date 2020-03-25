import { Injectable } from '@angular/core';
import { NoteModel } from './note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteActionsService {

  notes: NoteModel[] = new Array<NoteModel>();

  constructor() { }

  returnAllNotes() {
    return this.notes;
  }

  getNote(id: number) {
    return this.notes[id];
  }

  getId(note: NoteModel) {
    return this.notes.indexOf(note);
  }

  addNote(note: NoteModel) {
    let length = this.notes.push(note);
    return length - 1; // returning index
  }

  updateNote(id: number, title: string, content: string) {
    let note = this.notes[id];
    note.title = title;
    note.content = content;
  }

  deleteNote(id: number) {
    this.notes.splice(id, 1);
  }
}
