import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import pre komponent z Material
import { 
  MatCheckboxModule,
  MatRadioModule,
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatButtonModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatTabsModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  // NEPOTREBUJEME
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    // tu sa presunu vsetky moduly, v tomto pripade pre Material
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatTabsModule,
    MatDialogModule
  ]
})
export class MatComponentsModule { }
