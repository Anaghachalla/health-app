import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  url = 'http://localhost:3000';
  //current_user = '';

  constructor (private http : HttpClient) {
    //this.getUserFeedbackDetails()
  }

  specializations : any;
  patient_fields = ['username', 'name', 'phone', 'email', 'address', 'dob', 'gender']
  doctor_fields = ['username', 'name', 'phone', 'email', 'address', 'qualifications', 'specialization']

  
  getSpecializations()
  {
    return this.http.get(`${this.url}/doctor/specializations`)
  }
  //---------------------- user actions
  createUser(details: any)
  {
    if(details.user_role ==='doctor')
    {
      return this.http.post(`${this.url}/doctor/new`, details)
    }
    else
    {
      return this.http.post(`${this.url}/patient/new`, details)
    }
  }

  editUserDetails(details: any)
  {
    if(details.user_role ==='doctor')
    {
      return this.http.put(`${this.url}/doctor/update`, details)
    }
    else
    {
      return this.http.put(`${this.url}/patient/update`, details)
    }
  }

  getUser(details: any)
  {
    return this.http.get(`${this.url}/${details.user_type}/${details.username}`)
  }

  userLogin(details:any)
  {
    if(details.user_role==='doctor')
    {
      return this.http.post(`${this.url}/doctor/login`, details)
    }
    else if(details.user_role==='patient')
    {
      return this.http.post(`${this.url}/patient/login`, details)
    }
    else
    {
      return this.http.post(`${this.url}/admin/login`, details)
    }
  }

  forgotPassword(details: any)
  {
    return this.http.post(`${this.url}/forgot-password`, details)
  }
  //---------------------- appointments
  getFutureAppointments(details: any)
  {
    return this.http.post(`${this.url}/appointment/upcoming`, details)
  }
  getPastAppointments(details: any)
  {
    return this.http.post(`${this.url}/appointment/past`, details)
  }
  createAppointment(details:any)
  {
    return this.http.post(`${this.url}/appointment/new`, details)
  }

  //-------------------- medicines and orders
  getMedicineData(name: any)
  {
    return this.http.get(`${this.url}/medicine/${name}`)
  }

  getOneMed(unii:any)
  {
    return this.http.get(`${this.url}/medicine/details/${unii}`)
  }

  getCartData(name: any)
  {
    return this.http.get(`${this.url}/medicine/cart/${name}`)
  }

  saveCartData(name: any, details: any)
  {
    return this.http.post(`${this.url}/medicine/cart/${name}`, details)
  }

  placeOrder(details:any)
  {
    return this.http.post(`${this.url}/medicine/order/new`, details)
  }
  
  removeCartData(uname:any)
  {
    return this.http.delete(`${this.url}/medicine/cart/${uname}`)
  }

  getUserOrders(uname: any)
  {
    return this.http.get(`${this.url}/medicine/order/${uname}`)
  }

  //-------------------- search and filter doctors
  getAllDoctors()
  {
    return this.http.get(`${this.url}/doctor/all`)
  }

  filterBySpecialization(spec: any)
  {
    return this.http.get(`${this.url}/doctor/specialization/${spec}`)
  }
  filterAndSearch(spec:any, query_string: any)
  {
    return this.http.get(`${this.url}/doctor/search/${spec}/${query_string}`)
  }
  //--------------------- feedbacks
  getUserFeedback(username:any)
  {
    return this.http.get(`${this.url}/feedback/${username}`)
  }
  saveFeedback(details: any)
  {
    return this.http.post(`${this.url}/feedback/new`, details)
  }
  getAllFeedbacks()
  {
    return this.http.get(`${this.url}/feedback/all`)
  }
  searchFeedback(search:any)
  {
    return this.http.get(`${this.url}/feedback/search/${search}`)
  }
  sortFeedback(sort:any)
  {
    return this.http.get(`${this.url}/feedback/sort/${sort}`)
  }
  filterFeedback(filter:any)
  {
    return this.http.get(`${this.url}/feedback/filter/${filter}`)
  }
}
