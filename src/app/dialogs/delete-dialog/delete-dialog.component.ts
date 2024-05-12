import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent extends BaseDialog<DeleteDialogComponent>{

    constructor(
      dialogRef: MatDialogRef<DeleteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DeleteState,
    ) {
      super(dialogRef);
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    
}

export enum DeleteState{
  Yes,
  No
}