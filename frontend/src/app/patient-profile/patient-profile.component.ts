import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css', '../common-styles.css']
})
export class PatientProfileComponent implements OnInit {

  constructor(public userService : UserDetailsService) { }

  userType : any
  userData : any
  patient_fields: any
  new_user_data:any
  orders: any

  ngOnInit(): void {
    this.userType = localStorage.getItem('USER%TYPE')
    this.userData = JSON.parse(localStorage.getItem('CURRENT%USER') || '{}')
    //this.userData.dob = new Date(this.userData.dob).toDateString()
    this.new_user_data = {
      username: this.userData.username,
      name: this.userData.name,
      email: this.userData.email,
      user_role: 'patient',
      dob: this.userData.dob,
      gender: this.userData.gender,
      phone: this.userData.phone,
      address: this.userData.address
    }
    this.patient_fields = this.userService.patient_fields
    this.userData.gender = this.userData.gender.charAt(0).toUpperCase() + this.userData.gender.slice(1)
    
    this.getOrders()
  }

  editProfileDiv()
  {
    var data_div = document.getElementsByClassName('profile-data-display')[0] as HTMLDivElement
    data_div.style.display = 'none'
    var edit_div = document.getElementsByClassName("profile-data-edit")[0] as HTMLDivElement
    edit_div.style.display = 'inherit'
  }

  cancelEdit()
  {
    var data_div = document.getElementsByClassName('profile-data-display')[0] as HTMLDivElement
    data_div.style.display = 'inherit'
    var edit_div = document.getElementsByClassName("profile-data-edit")[0] as HTMLDivElement
    edit_div.style.display = 'none'
  }

  saveEdit()
  {
    this.userService.editUserDetails(this.new_user_data).subscribe((data : any)=>{
      this.userData = data._doc
      //this.userData.dob_display = new Date(this.userData.dob).toDateString()
      localStorage.setItem('CURRENT%USER', JSON.stringify(this.userData))
      this.cancelEdit()
    })
  }

  getOrders()
  {
    this.userService.getUserOrders(this.userData.username).subscribe((data:any)=>{
      this.orders = data.data
      console.log(this.orders);
      
    })
  }

}

