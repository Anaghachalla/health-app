import { Component } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css', '../common-styles.css']
})
export class ForgotPasswordComponent {

  constructor(
    public userService: UserDetailsService,
    private route:Router
    ) {}

  userDetails = {
    username: '',
    email: '',
  }

  code : any;

  password = {
    password: '',
    confirm_password: ''
  }


  sendEmail()
  {
      var div = document.getElementById('forgot_password') as HTMLDivElement
      div.style.display = 'none'
      var div2 = document.getElementById('code-div') as HTMLDivElement
      div2.style.display = 'inherit'
      var div3 = document.getElementById('reset-pw-div') as HTMLDivElement
      div3.style.display = 'none'
      this.userService.forgotPassword(this.userDetails).subscribe(data=>{
      var result : any = data
      if(result.status==='success')
      {
        this.code = result.code
      }
      else
      {
        alert('Process failed due to an error. Please try later.')
      }
    })
  }
  submitCode()
  {
    var code_entered = document.getElementById('code') as HTMLInputElement
    if(code_entered.value === this.code)
    {
        var div = document.getElementById('forgot_password') as HTMLDivElement
        div.style.display = 'none'
        var div2 = document.getElementById('code-div') as HTMLDivElement
        div2.style.display = 'none'
        var div3 = document.getElementById('reset-pw-div') as HTMLDivElement
        div3.style.display = 'inherit'
    }
  }

  resetPassword()
  {
    
    this.userService.forgotPassword(this.password).subscribe(data=>{
      var result : any = data
      if(result.status ==='success')
      {
        alert('Successfully reset')
        this.route.navigate(['/login'])
      }
      else
      {
        var span = document.getElementById('password-error') as HTMLSpanElement
        if(result.message)
        {
          span.innerText = result.message
        }
        else
        {
          span.innerText = result.errors
        }
      }
    })
  }

}
