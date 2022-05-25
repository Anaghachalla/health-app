import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css', '../common-styles.css']
})
export class DoctorHomeComponent implements OnInit {

  constructor(
    public userService : UserDetailsService,
    public router:Router,
    private route: ActivatedRoute
  ) { }

  appointments: any
  current_user : any

  ngOnInit(): void {
    this.current_user = JSON.parse(localStorage.getItem('CURRENT%USER') || '{}')
    this.getFutureAppointments()
  }

  getFutureAppointments()
  {
      this.userService.getFutureAppointments({username: this.current_user.username, role: this.current_user.user_type}).subscribe((data:any)=>{
      if(data.status ==='success')
      {
        this.appointments = data.data
        if(this.appointments.length>0)
        {
          for(let i=0; i<this.appointments.length; i++)
          {
            this.userService.getUser({user_type: 'patient', username: this.appointments[i].patient_username}).subscribe((data:any)=>{
              this.appointments[i].gender = data._doc.gender
              var today = new Date();
              var birthDate = new Date(new Date(data._doc.dob));
              var age = today.getFullYear() - birthDate.getFullYear();
              var m = today.getMonth() - birthDate.getMonth();
              if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
              {
                  age--;
              }
              this.appointments[i].age = age
              console.log(this.appointments);
            })
          }
        }
      }
    })
  }

}
