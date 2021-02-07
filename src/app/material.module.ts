import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import {MatListModule} from '@angular/material/list';



@NgModule({
  declarations: [],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatListModule
  ], 
  exports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatListModule
  ]
})
export class MaterialModule { }
