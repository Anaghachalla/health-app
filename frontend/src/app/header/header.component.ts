import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../common-styles.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public userService: UserDetailsService,
    public router: Router,
    public route: ActivatedRoute
    ) { }

  current_user :any
  user_details:any

  ngOnInit(): void {
    this.current_user = localStorage.getItem('CURRENT%USER')
    this.user_details = JSON.parse(localStorage.getItem('CURRENT%USER') || '{}')
  }
  showOptions()
  {
    var ele = document.getElementsByClassName('dropdown-options')[0] as HTMLDivElement
    ele.style.display = 'block'
  }
  hideOptions()
  {
    var ele = document.getElementsByClassName('dropdown-options')[0] as HTMLDivElement
    ele.style.display = 'none'
  }

  logUserOut()
  {
    localStorage.removeItem('CURRENT%USER')
    localStorage.removeItem('USER%TYPE')
    localStorage.removeItem('SHOW%FEEDBACK')
    let details = {
      username: this.user_details.username,
      user_type: this.user_details.user_type
    }
    document.cookie = `userdetails=${JSON.stringify(details)}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=http://localhost:4200/`;
    this.router.navigate([''], { relativeTo: this.route })
  }

  goToHome()
  {
    this.router.navigate(['/home'], { relativeTo: this.route })
  }

  goToProfile()
  {
    this.router.navigate(['/profile'], { relativeTo: this.route })
  }


}
