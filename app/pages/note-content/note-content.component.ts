import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NoteModel } from '../general/note.model';
import { NoteActionsService } from '../general/note-actions.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-note-content',
  styleUrls: ['./note-content.component.sass'],
  template: `
    <div class="form">
      <form #myForm="ngForm" (ngSubmit)="submitForm(myForm)">

        <div class="form-area">
          <label>Title</label>
          <div class="form-content">
            <input type="text" name="title" [ngModel]="note.title" required>
          </div>
        </div>

        <div class="form-area">
          <label>Content</label>
          <div class="form-content">
            <textarea name="content" [ngModel]="note.content"></textarea>
          </div>
        </div>

        <div class="buttons">
          <button type="button" class="cancelButton" (click)="cancel()">Cancel</button>
          <button type="submit" class="submitButton" [disabled]="!myForm.valid">Save</button>
        </div>

      </form>
    </div>
  `
})
export class NoteContentComponent implements OnInit {

  note: NoteModel;
  noteId: number;
  creatingNewNote: boolean;

  constructor(private notesService: NoteActionsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    // checking if we creating a new one or editing
    this.route.params.subscribe((params: Params) => {
      this.note = new NoteModel();

      if(params.id) {
        this.note = this.notesService.getNote(params.id)
        this.noteId = params.id
        this.creatingNewNote = false
      } else {
        this.creatingNewNote = true;
      }
    })
  }

  submitForm(form: NgForm) {
    if(this.creatingNewNote) {
      this.notesService.addNote(form.value);
    } else {
      this.notesService.updateNote(this.noteId, form.value.title, form.value.content)
    }

    this.router.navigateByUrl('/');
  }

  cancel() {
    this.router.navigateByUrl('/');
  }

}
