import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetailsService } from '../details-service.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {


  userForm!: FormGroup;

  constructor(private fb: FormBuilder,public dialogRef: MatDialogRef<any>) {}

  ngOnInit() {
    this.initializeForm();
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
