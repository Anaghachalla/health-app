import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.css', '../common-styles.css']
})
export class PatientHomeComponent implements OnInit {

  constructor(
    public userService: UserDetailsService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  current_user : any
  appointments: any

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
            this.userService.getUser({user_type: 'doctor', username: this.appointments[i].doctor_username}).subscribe((data:any)=>{
              this.appointments[i].specialization = data._doc.specialization
            })
          }
        }
      }
    })
  }


}
