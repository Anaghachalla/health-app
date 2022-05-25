import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../common-styles.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public userService : UserDetailsService,
    public router:Router,
    private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        localStorage.removeItem('CURRENT%USER')
        localStorage.removeItem('USER%TYPE')
    }

  userType = ''

  loginDetails = {
    username: '',
    password: '',
    user_role: '',
    remember_me: ''
  }

  changeUserType()
  {
    var e = (document.getElementById("user-role")) as HTMLSelectElement;
    var sel = e.selectedIndex;
    var opt = e.options[sel];
    var user = (<HTMLOptionElement>opt).value;
    this.userType = user
  }

  loginSubmit()
  {
    this.clearErrors()
    this.userService.userLogin(this.loginDetails).subscribe(data=>{
      var result:any = data
  
      if(result.status==='failed')
      {
        if(result.message)
        {
          for (var i of Object.keys(result.message))
          {
            let ele = document.getElementsByClassName(`user-error`)[0] as HTMLSpanElement
            ele.innerText = result.message[i].message
          }
        }
        else if(result.thrown)
        {
          let ele = document.getElementsByClassName(`user-error`)[0] as HTMLSpanElement
          ele.innerText = result.thrown
        }
      }
      else
      {
        this.clearErrors()
        delete result.status
        delete result._doc._id
        delete result._doc.__v
        localStorage.setItem('CURRENT%USER', JSON.stringify(result._doc))
        localStorage.setItem('USER%TYPE', result._doc.user_type)

        
        if(this.loginDetails.remember_me!='')
        {
          this.createCookie(this.loginDetails.username, this.loginDetails.user_role)
        }
        // this.getfeedback()

        //route to home
        this.router.navigate(['/home'], { relativeTo: this.route, replaceUrl:true })
        
      }
      
    })
  }

  clearErrors()
  {
    var errors = document.querySelectorAll('span')
    errors.forEach(i=>{
      i.innerText=''
    })
  }

  // getfeedback()
  // {
  //   this.userService.getUserFeedback(this.loginDetails.username).subscribe((data:any)=>{
  //     if(data.data==='')
  //     {
  //       localStorage.setItem('SHOW%FEEDBACK', 'true')
  //     }
  //     else
  //     {
  //       localStorage.setItem('SHOW%FEEDBACK', 'false')
  //     }
  //   })
  // }

  createCookie(uname:any, user_type: any)
  {
    var date = new Date()
    var details = {
      username: uname,
      user_type: user_type
    }
    date.setTime(date.getTime() + (2*24*60*60*1000))
    var cookie = `userdetails=${JSON.stringify(details)};expires=${date.toUTCString()};path= http://localhost:4200/`
    document.cookie = cookie
  }

  


}
