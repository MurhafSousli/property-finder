import { NgModule } from '@angular/core';
import {
  MdButtonModule, MdGridListModule, MdIconModule, MdInputModule, MdListModule, MdButtonToggleModule,
  MdCardModule, MdChipsModule, MdAutocompleteModule
} from '@angular/material';

@NgModule({
  imports: [
    MdGridListModule,
    MdInputModule,
    MdButtonModule,
    MdListModule,
    MdIconModule,
    MdButtonToggleModule,
    MdCardModule,
    MdChipsModule,
    MdAutocompleteModule
  ],
  exports: [
    MdGridListModule,
    MdInputModule,
    MdButtonModule,
    MdListModule,
    MdIconModule,
    MdButtonToggleModule,
    MdCardModule,
    MdChipsModule,
    MdAutocompleteModule
  ]
})
export class MaterialModule { }
