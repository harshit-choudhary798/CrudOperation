import { users } from './../auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-unknownroute',
  templateUrl: './unknownroute.component.html',
  styleUrls: ['./unknownroute.component.css']
})
export class UnknownrouteComponent implements OnInit {

  url = 'https://api.imgflip.com/get_memes';


  constructor(private http: HttpClient) {}

  errorImgs:any[]=[]
  bgimg=''

  ngOnInit(): void {
    this.http.get(this.url).pipe(
      map((response: any) => response.data.memes)
    )
    .subscribe((memes: any[]) => {
      memes.forEach((meme) => {
        this.errorImgs.push(meme.url);
        console.log(meme.url);
      });

      
      this.setRandomBgImage();
    });
  }

  setRandomBgImage(): void {
    const randomIndex = Math.floor(Math.random() * this.errorImgs.length);
    this.bgimg = this.errorImgs[randomIndex];
  }

}