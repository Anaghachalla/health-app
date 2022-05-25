import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor-search',
  templateUrl: './doctor-search.component.html',
  styleUrls: ['./doctor-search.component.css', '../common-styles.css']
})
export class DoctorSearchComponent implements OnInit {

  constructor(
    public userService : UserDetailsService,
    public router:Router,
    private route: ActivatedRoute
  ) { }

  doctors: any
  specializations: any
  appointment_doc_uname: any
  appointment_doc_name: any

  ngOnInit(): void {
    
    this.applyFilter()
    this.userService.getSpecializations().subscribe((data:any)=>{
      this.specializations = data
    })
  }

  applyFilter()
  {
    var spec = document.getElementById('specializations-filter') as HTMLSelectElement
    if(spec.value!=='all')
    {
      this.userService.filterBySpecialization(spec.value).subscribe((data:any)=>{
        if(data.status==='success')
        {
          this.doctors = data.data
        }
        else
        {
          console.log(data.message);
          
        }
      })
    }
    else
    {
      this.userService.getAllDoctors().subscribe((data : any)=>{
        if(data.status ==='success')
        {
          this.doctors = data.data
        }
      })
    }
  }

  searchDoctor()
  {
    var search_srting = document.getElementById('search-bar') as HTMLInputElement
    var spec = document.getElementById('specializations-filter') as HTMLSelectElement
    this.userService.filterAndSearch(spec.value, search_srting.value).subscribe((data:any)=>{
      if(data.status==='success')
      {
        this.doctors = data.data
      }
      else
      {
        console.log(data);
        
      }
    })
  }

  getAppointmentView(uname: any, name: any)
  {
    var div = document.getElementById('appointment-view') as HTMLDivElement
    div.style.display = 'inherit'
    this.appointment_doc_uname = uname
    this.appointment_doc_name = name
    var not_popup = document.getElementsByClassName('not-popup')
    for(let i=0; i<not_popup.length; i++)
    {
      (not_popup[i] as HTMLDivElement).style.filter = 'blur(10px)'
    }
  }

}
