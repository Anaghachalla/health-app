import { Component, OnInit} from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../common-styles.css']
})
export class ProfileComponent implements OnInit{

  constructor() { }

  user_type : any
  ngOnInit(): void {
    this.user_type = localStorage.getItem('USER%TYPE');
    (() => {
      if (window.localStorage) {
        if (!localStorage.getItem('reload')) {
            localStorage['reload'] = true;
            window.location.reload();
        } else {
            localStorage.removeItem('reload');
        }
      }
  })();
    
  }

}
