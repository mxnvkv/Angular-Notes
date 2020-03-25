import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { NoteContentComponent } from './pages/note-content/note-content.component';


const routes: Routes = [
  { path: '', component: LayoutComponent, children: [
    { path: '', component: NotesListComponent },
    { path: 'new', component: NoteContentComponent  },
    { path: ':id', component: NoteContentComponent  }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
