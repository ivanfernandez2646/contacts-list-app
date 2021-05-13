import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenericConfirmDialog } from 'src/app/models/helpers/generic-confirm-dialog';

@Component({
  selector: 'app-generic-confirm-dialog',
  templateUrl: './generic-confirm-dialog.component.html',
  styleUrls: ['./generic-confirm-dialog.component.css']
})
export class GenericConfirmDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<GenericConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GenericConfirmDialog) { }

  ngOnInit(): void {
  }


}
