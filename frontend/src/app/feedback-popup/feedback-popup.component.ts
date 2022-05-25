import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-feedback-popup',
  templateUrl: './feedback-popup.component.html',
  styleUrls: ['./feedback-popup.component.css', '../common-styles.css']
})
export class FeedbackPopupComponent implements OnInit {

  constructor(
    public userService : UserDetailsService,
    public router:Router,
    private route: ActivatedRoute,
    private _location: Location
  ) { }

  feedback_popup = 1
  current_user: any
  feedback={
    ratings: '',
    suggessions: '',
    username: '',
    user_type: ''
  }
  show_feedback: any

  ngOnInit(): void {
    this.current_user = JSON.parse(localStorage.getItem('CURRENT%USER') || '{}')
  }

  colourStars(value: any)
  {
    for(let i=1; i<6; i++)
    {
      var div = document.getElementById(`${i}-star`) as HTMLSpanElement
      div.classList.remove('checked')
    }

    for(let i=1; i<value+1; i++)
    {
      var div = document.getElementById(`${i}-star`) as HTMLSpanElement
      div.classList.add('checked') 
    }
    this.feedback.ratings = value
  }

  submitfb1()
  {
    this.feedback_popup = 2
  }

  submitfb2()
  {
    var sug = document.getElementById('suggessions') as HTMLTextAreaElement
    this.feedback.suggessions = sug.value
    this.feedback.username = this.current_user.username
    this.feedback.user_type = this.current_user.user_type

    this.userService.saveFeedback(this.feedback).subscribe((data:any)=>{
      if(data.status ==='success')
      {
        alert('Feedback recorded')
        this.show_feedback = false
        this.closeFeedback()
      }
      else
      {
        console.log(data);
        
        alert('Failed to send feedback')
      }
    })
  }

  closeFeedback()
  {
    localStorage.setItem('SHOW%FEEDBACK', 'false')
    this.feedback_popup =1
    //close
    this._location.back();
  }

}
