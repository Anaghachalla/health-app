import { Component, OnInit, Input } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.css', '../common-styles.css']
})
export class MedicineDetailsComponent implements OnInit {

  constructor(
    public userService : UserDetailsService,
    public router:Router,
    private route: ActivatedRoute

  ) { }

  @Input() unii : any
  @Input() med_details : any
  @Output() displayPopup = new EventEmitter<boolean>();

  ngOnInit(): void {
    
  }

  changeDisplay()
  {
    this.displayPopup.emit(false)
  }

  

}
