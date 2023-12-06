// details.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  private apiUrl = ' http://localhost:3000/users';

  
  addUser(form: any): Observable<any> {
    const id = new Date().getTime().toString();
    const formDataWithId = { ...form, id };
    return this.http.post(this.apiUrl, formDataWithId);
  }
  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateData(id:any,data:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`,data)
  }


  deleteData(id:any){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
