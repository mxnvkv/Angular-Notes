import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ListItemComponent } from './list-item/list-item.component';
import { NoteContentComponent } from './pages/note-content/note-content.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    LayoutComponent,
    ListItemComponent,
    NoteContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
