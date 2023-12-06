import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailsService } from '../details-service.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {


  userForm!: FormGroup;
  details: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    ) {

      this.details = data;
    }

  ngOnInit() {

    if(this.data){
      console.log(this.data.data,'Got data ')
      const Details=this.data.data
      this.userForm = this.fb.group({
        name: [Details.name, Validators.required],
        branch: [Details.branch, Validators.required],
        city: [Details.city, Validators.required],
        phone: [Details.phone, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      }
    

      );
      
    }else{
      console.log('add working')
      this.initializeForm();

    }

  }

  initializeForm() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      branch: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  onSubmit() {
    console.log(this.userForm.value)
    this.dialogRef.close(this.userForm.value)
} 



}
