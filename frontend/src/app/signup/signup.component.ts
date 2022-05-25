import { Component, AfterViewInit} from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../common-styles.css'],
})


export class SignupComponent implements AfterViewInit{

  constructor ( 
    public userService : UserDetailsService,
    public router:Router,
    private route: ActivatedRoute
    ) {}

  userType = '';
  specializations : any

  signupDetails = {
    username: '',
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    user_role: '',
    specialization: '',
    qualifications: '',
    dob: '',
    gender: ''
  }

  //@ViewChild('signup_component') signup_component: ElementRef
  ngAfterViewInit() {
    this.userService.getSpecializations().subscribe(data => {
      this.specializations=data
    })
  }


  changeUserType()
  {
    var e = (document.getElementById("user-role")) as HTMLSelectElement;
    var sel = e.selectedIndex;
    var opt = e.options[sel];
    var user = (<HTMLOptionElement>opt).value;
    this.userType = user
    if(this.userType ==='doctor')
    {
      this.signupDetails.dob=''
      this.signupDetails.gender = ''
    }
    else if(this.userType ==='patient')
    {
      this.signupDetails.qualifications=''
      this.signupDetails.specialization=''
    }
    this.clearErrors()
  }

  signupSubmit()
  {
    this.clearErrors()
    this.userService.createUser(this.signupDetails).subscribe(data=>{
      var result : any = data
      if(result.status ==='failed')
      {
        if(result.message)
        {
          for (var i of Object.keys(result.message))
          {
            let ele = document.getElementsByClassName(`${i}-error`)[0] as HTMLSpanElement
            ele.innerText = result.message[i].message
          }
        }
        else if(result.thrown)
        {
          let ele = document.getElementsByClassName(`username-error`)[0] as HTMLSpanElement
          ele.innerText = result.thrown
        }
      }
      else if (result.status==='success')
      {
        this.clearErrors()
        
        //this.clearInputs()
        
        delete result.status
        delete result._doc._id
        delete result._doc.__v
        localStorage.setItem('CURRENT%USER', JSON.stringify(result._doc))
        localStorage.setItem('USER%TYPE', result._doc.user_type)
        //this.getfeedback()
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
  clearInputs()
  {
    this.signupDetails = {
      username: '',
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      user_role: '',
      specialization: '',
      qualifications: '',
      dob: '',
      gender: ''
    }
    
  }

  // getfeedback()
  // {
  //   this.userService.getUserFeedback(this.signupDetails.username).subscribe((data:any)=>{
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
  

}
