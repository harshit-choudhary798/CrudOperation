import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { DetailsService } from '../details-service.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';

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

  constructor(private details: DetailsService,private dialog:MatDialog) {}

  ngOnInit(): void {
    this.details.getData().subscribe(
      (response: any) => {
        this.Users = response;
        console.log(this.Users);
  
        if (this.Users.length > 0) {
          this.Keys = Object.keys(this.Users[0]);
          this.dataSource = new MatTableDataSource(this.Users);
  
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
          
          
          if (!this.Keys.includes('update')) {
            this.Keys.push('update');
          }
          if (!this.Keys.includes('delete')) {
            this.Keys.push('delete');
          }
  
          console.log(this.Keys);
        }
      },
      (error:any) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  add(){
    this.dialog.open(UserFormComponent)
  }

  update(element: any) {
    alert(JSON.stringify(element));
  }
  

  delete(element:any){}


}