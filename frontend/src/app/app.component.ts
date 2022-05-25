import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserDetailsService } from './user-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './common-styles.css']
})

export class AppComponent implements OnInit{
  constructor(
    public router:Router,
    private route: ActivatedRoute,
    public userService : UserDetailsService
  ){}

  title = 'Clinical';
  

  ngOnInit(): void {
  }
}
