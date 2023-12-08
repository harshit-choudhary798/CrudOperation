import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css'],
})
export class PersonalDetailsComponent implements OnInit {
  userDetails: any;
  details: any;
  Filepath: string;



  constructor( @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.details = data;

    console.log(this.details)
    console.log(this.details.fileName)
     this.Filepath='/assets/'+this.details.fileName
    console.log(this.Filepath)
  }

  ngOnInit(): void {
    
  }
}
