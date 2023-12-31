
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { DetailsService } from '../details-service.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
import { zip } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  Users: any[] = [];
  Keys: string[] = [];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  constructor(private details: DetailsService, private dialog: MatDialog,private router:Router) {}

  ngOnInit(): void {
    this.loadData();
  }


// Example MatTable column definition in your component


  loadData() {
    this.details.getData().subscribe(
      (response: any) => {
        
        this.Users = response;
        console.log(this.Users);
        console.log(this.Users.length);
  
        this.serialIndex();
  
        if (this.Users.length > 0) {
          this.Keys = Object.keys(this.Users[0]);
  
          const idIndex = this.Keys.indexOf('id');
          if (idIndex !== -1) {
            this.Keys.splice(idIndex, 1);
          }
          
          
          if (this.Keys.indexOf('fileName') !== -1) {
            this.Keys.splice(this.Keys.indexOf('fileName'), 1);
          }

                    
          if (this.Keys.indexOf('fileSize') !== -1) {
            this.Keys.splice(this.Keys.indexOf('fileSize'), 1);
          }

          if (this.Keys.indexOf('fileType') !== -1) {
            this.Keys.splice(this.Keys.indexOf('fileType'), 1);
          }

          

  
          // Add "serial" to the Keys array at index 1
          this.Keys.splice(0, 0, 'serial');
  
          // Combine serial numbers with the original Users array
          this.Users = this.Users.map((user, index) => ({ ...user, serialNumber: this.serial[index] }));
  
          this.dataSource = new MatTableDataSource(this.Users);
  
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
  
          if (!this.Keys.includes('actions')) {
            this.Keys.push('actions');
          }

          // if (!this.Keys.includes('fileName')) {
          //   this.Keys.push('fileName');
          // }
          console.log(this.Keys);
        }
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  
  serial: any = [];
  
  serialIndex() {
    this.serial = Array.from({ length: this.Users.length }, (_, i) => i + 1);
  }
  
  
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  add() {
    const dialogRef = this.dialog.open(UserFormComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.details.addUser(result).subscribe((res) => {
          console.log('this is the response', res);
          // this.Users.push(res);
          // this.dataSource.data=this.Users

          this.loadData()
          this.serialIndex();
        });
      } else {
        console.log('Dialog closed without result');
      }
      console.log('Dialog closed. Performing additional actions.');
    });
  }
  update(element: any) {
    const UpdatedData={}
   console.log(element)
    const dialogRef = this.dialog.open(UserFormComponent, { data: { 'data': element } });
    
    dialogRef.afterClosed().subscribe(
      (res)=>{
        if(res){
          console.log('data', res)
          this.details.updateData(element.id,res).subscribe((res)=>{
            console.log('res', res)
            this.loadData()
          })
        }
       
        
      }
      
      )
  }

  deleteData(element: any) {

    if(confirm('are you sure')){
      this.details.deleteData(element.id).subscribe((res)=>{
        console.log(res)
      })
      this.loadData()
    }



  }


  loggedOut(){
    sessionStorage.clear()
    // this.router.navigate(['/login'])
    window.location.reload()
  }

  downloadDetails(element: any) {
   
    const dialogRef = this.dialog.open(PersonalDetailsComponent, {
      data: element 
    });


    dialogRef.afterClosed().subscribe(result => {

      console.log('Dialog closed with result:', result);
    });
  }


  addressTooltip(address:{city:string,street:string,zip:string}){
    return `${address.city}  ${address.street } ${address.zip}`
  }
}
