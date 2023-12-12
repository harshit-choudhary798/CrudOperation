import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, FormControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  details: any;
  ChangeImage: boolean=true;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
  }

  ngOnInit() {
    
    if (this.data) {
      const Details = this.data.data;
      
      this.userForm = this.fb.group({
        name: [Details.name || '', Validators.required],
        emails: this.fb.array(this.createEmailControls(Details.emails)),
        phones: this.fb.array(this.createPhoneControls(Details.phones)),
        addresses: this.fb.array(this.createAddressControls(Details.addresses)),
        image: [Details.image],
        
        fileName: [Details.fileName], 
        fileSize: [Details.fileSize], 
        fileType: [Details.fileType],
      });  

      this.ChangeImage=false

    } else {
      this.initializeForm();
    }
  }

  initializeForm() {
    this.userForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(15),
          this.ShouldNotContainNumber()
        ]
      ],
      emails: this.fb.array([
        this.fb.control('', [Validators.required, Validators.email])
      ]),
      phones: this.fb.array([
        this.fb.control('', [Validators.required, Validators.pattern(/^\d{10}$/)])
      ]),
      addresses: this.fb.array([this.createAddressControl('', '', '')]),
      image: [null],
      fileName: [''],
      fileSize: [''],
      fileType: [''],
    });
  }
  
  ShouldNotContainNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value;
  
      if (/\d/.test(value)) {
        
        return { ShouldNotContainNumber: true };
      }
  
      
      return null;
    };
  }
  

  onFileSelected(event: any) {
    console.log('file name:', event.target.files[0].name);
    console.log('file size:', event.target.files[0].size);
    console.log('file type', event.target.files[0].type);

  
      // Update the file name, size, and type in the form
      this.userForm.patchValue({
        fileName: event.target.files[0].name,
        fileSize: event.target.files[0].size,
        fileType: event.target.files[0].type,
      });

  }
  

  createPhoneControls(phones: string[] = []): AbstractControl[] {
    return phones.map(phone => this.fb.control(phone, [Validators.required, Validators.pattern(/^\d{10}$/)]));
  }

  createEmailControls(emails: string[] = []): AbstractControl[] {
    return emails.map(email => this.fb.control(email));
  }

  createAddressControls(addresses: {street: string, city: string, zip: string }[] = []): FormGroup[] {
    const mappedAddress = addresses.map(address => this.createAddressControl(address.city, address.street, address.zip));  
    return mappedAddress;
  }

  get emailControls() {
    return (this.userForm.get('emails') as FormArray);
  }

  get addressControls(): FormGroup[] {
    return (this.userForm.get('addresses') as FormArray).controls as FormGroup[];
  }

  get phoneControls(){
    return (this.userForm.get('phones') as FormArray);
  }

  createAddressControl(city: string, street: string, zip: string): FormGroup {
    return this.fb.group({
      city: [city, [Validators.required,this.ShouldNotContainNumber(),Validators.maxLength(12)]],
      street: [street,Validators.maxLength(4)],
      zip: [zip, [Validators.required,Validators.pattern(/^[0-9]{6}$/),]],
    });
  }

  addMoreAddress() {
    const addressesFormArray = this.userForm.get('addresses') as FormArray;
    const newAddressControl = this.createAddressControl('', '', '');
    addressesFormArray.push(newAddressControl);
    // this.userForm.markForCheck();
  }
  
  
  
  
  
  addMoreEmail() {
    const newEmailControl = this.fb.control('', [Validators.required, Validators.email]);
    this.emailControls.push(newEmailControl);
  }

  addMorePhoneNumbers(){
    const newPhoneControl=this.fb.control('',Validators.required);
    this.phoneControls.push(newPhoneControl)
  }

  deletePhone(i: number) {
    this.phoneControls.removeAt(i);
  }

  deleteEmail(i:number){
    this.emailControls.removeAt(i)
  }

  deleteAddress(i: number) {
    (this.userForm.get('addresses') as FormArray).removeAt(i);
  }

  onSubmit() {
    console.log(this.userForm);
    if(this.userForm.valid){
      this.dialogRef.close(this.userForm.value);
    }else{
      this.userForm.markAllAsTouched()
    }
  }
}
