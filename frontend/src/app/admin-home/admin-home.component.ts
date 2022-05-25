import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css', '../common-styles.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(
    public userService : UserDetailsService,
    public router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllFeedbacks()
  }

  feedbacks: any

  searchFeedback()
  {
    var search = document.getElementById('search') as HTMLInputElement
    this.userService.searchFeedback(search.value).subscribe((data:any)=>{
      this.feedbacks = data.data;
    })
  }
  sortFeedback()
  {
    var sort = document.getElementById('sort') as HTMLSelectElement
    this.userService.sortFeedback(sort.value).subscribe((data:any)=>{
      this.feedbacks = data.data;
    })
  }
  filterFeedback()
  {
    var filter = document.getElementById('filter') as HTMLSelectElement
    this.userService.filterFeedback(filter.value).subscribe((data:any)=>{
      this.feedbacks = data.data;
    })
  }

  getAllFeedbacks()
  {
    this.userService.getAllFeedbacks().subscribe((data:any)=>{
      this.feedbacks = data.data;
    })
  }


  clearInputs()
  {
    var search = document.getElementById('search') as HTMLInputElement
    search.value=''
    var sort = document.getElementById('sort') as HTMLSelectElement
    sort.value=''
    var filter = document.getElementById('filter') as HTMLSelectElement
    filter.value=''
    this.getAllFeedbacks()
  }

}
