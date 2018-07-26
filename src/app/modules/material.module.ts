import { NgModule } from "@angular/core";
import {
  MatSnackBarModule,
  MatToolbarModule,
  MatSidenavModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatListModule,
  MatTooltipModule,
  MatSelectModule,
  MatCheckboxModule,
  MatFormFieldModule
} from '@angular/material';

@NgModule({
  imports: [
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatListModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule
  ],
  exports: [
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatListModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule
  ]
})
export class MaterialModule {}
