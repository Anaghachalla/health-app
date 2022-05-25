import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css', '../common-styles.css']
})
export class DoctorProfileComponent implements OnInit {

  constructor(public userService : UserDetailsService) { }

  userType : any
  userData : any
  doctor_fields: any

  new_user_data : any

  orders: any

  ngOnInit(): void {
    this.userType = localStorage.getItem('USER%TYPE')
    this.userData = JSON.parse(localStorage.getItem('CURRENT%USER') || '{}')
    this.new_user_data = {
      username: this.userData.username,
      name: this.userData.name,
      email: this.userData.email,
      user_role: 'doctor',
      specialization: this.userData.specialization,
      qualifications: this.userData.qualifications,
      phone: this.userData.phone,
      address: this.userData.address
    }
    this.doctor_fields = this.userService.doctor_fields
    this.userData.qualifications = this.userData.qualifications.join('\n')
    this.userData.specialization = this.userData.specialization.charAt(0).toUpperCase() + this.userData.specialization.slice(1)

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
