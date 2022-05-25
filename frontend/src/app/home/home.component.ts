import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../common-styles.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public userService : UserDetailsService,
    public router: Router,
    public route: ActivatedRoute
    ) { }

  user_type : any
  user: any
  feedback : any

  refreshed = false

  ngOnInit(): void {
    this.user_type = localStorage.getItem('USER%TYPE');
    this.user = JSON.parse(localStorage.getItem('CURRENT%USER') || '{}');
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
  
    if(localStorage.getItem('SHOW%FEEDBACK')==='true')
    {
      setTimeout(()=>{
        this.router.navigate(['/feedback'], { relativeTo: this.route })
      }, 1000)
    }
      

  }

  

}
