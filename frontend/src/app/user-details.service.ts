import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  url = 'http://localhost:3000';

  constructor (private http : HttpClient) {}

  specializations : any = [];
  patient_fields = ['username', 'name', 'phone', 'email', 'address', 'date of birth', 'gender']
  doctor_fields = ['username', 'name', 'phone', 'email', 'address', 'qualifications', 'specialization']

  getSpecializations() : string[]
  {
    this.specializations = this.http.get<string[]>(`${this.url}/doctor/specializations`)
    return this.specializations;
  }

  createUser()
  {

  }
  editUser()
  {

  }
}
