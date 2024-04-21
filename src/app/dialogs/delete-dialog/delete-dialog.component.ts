import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent{

    constructor(
      public dialogRef: MatDialogRef<DeleteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DeleteState,
    ) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    
    close():void{
      this.dialogRef.close();
    }

}

export enum DeleteState{
  Yes,
  No
}