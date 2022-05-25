import { Component, OnInit, Input } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-appointment-form',
  templateUrl: './new-appointment-form.component.html',
  styleUrls: ['./new-appointment-form.component.css', '../common-styles.css']
})
export class NewAppointmentFormComponent implements OnInit {

  constructor(
    public userService : UserDetailsService,
    public router:Router,
    private route: ActivatedRoute
  ) { }

  current_user : any

  @Input() doctor_uname: any
  @Input() doctor_name: any

  appointment_details={
    patient_name : '',
    patient_username : '',
    doctor_username: '',
    doctor_name: '',
    time: '',
    problem: ''
  }

  ngOnInit(): void {
    this.current_user = JSON.parse(localStorage.getItem('CURRENT%USER')|| '{}')
    this.appointment_details.patient_username = this.current_user.username
    this.appointment_details.patient_name = this.current_user.name

    //min today
    var inp = document.querySelector("input[type='datetime-local']") as HTMLInputElement
    inp.setAttribute('min', new Date().toISOString())
  }

  closeAppointmentForm()
  {
    var div = document.getElementById('appointment-view') as HTMLDivElement
    div.style.display = 'none'
    var not_popup = document.getElementsByClassName('not-popup')
    for(let i=0; i<not_popup.length; i++)
    {
      (not_popup[i] as HTMLDivElement).style.filter = 'blur(0px)'
    }
  }

  scheduleAppointment()
  {
    this.appointment_details.doctor_username = this.doctor_uname
    this.appointment_details.doctor_name = this.doctor_name
    
    this.userService.createAppointment(this.appointment_details).subscribe((data:any)=>{
      if(data.status==='success')
      {
        alert('Appointment scheduled!')
      }
      else
      {
        alert('Failed to schedule appointment')
      }
      this.appointment_details={
        patient_name : this.current_user.username,
        patient_username : this.current_user.name,
        doctor_username: '',
        doctor_name: '',
        time: '',
        problem: ''
      }
      this.closeAppointmentForm()
    })
    
  }

}
