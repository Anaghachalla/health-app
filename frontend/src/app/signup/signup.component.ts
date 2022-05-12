import { Component, OnInit, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { UserDetailsService } from '../user-details.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

// export class SignupComponent{
  
  
// }

export class SignupComponent implements AfterViewInit{

  constructor ( public service : UserDetailsService) {}

  userType = '';
  specializations : string[] = []

  //@ViewChild('signup_component') signup_component: ElementRef
  ngAfterViewInit() {
    this.specializations = (<string[]>this.service.getSpecializations())
    console.log(this.specializations);
    // for(let i=0; i<this.specializations.length; i++)
    // {
    //   console.log(i);
      
    // }
    
  }


  changeUserType()
  {
    var e = (document.getElementById("user-role")) as HTMLSelectElement;
    var sel = e.selectedIndex;
    var opt = e.options[sel];
    var user = (<HTMLOptionElement>opt).value;
    this.userType = user
  }

  

}
