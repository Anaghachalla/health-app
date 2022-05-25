import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css', '../common-styles.css']
})
export class IndexComponent implements OnInit{

  constructor(
    public userService : UserDetailsService,
    public router:Router,
    private route: ActivatedRoute

  ) { }

  

  ngOnInit(): void {
      (() => {
        if (window.localStorage) {
          if (!localStorage.getItem('reload')) {
              localStorage['reload'] = true;
              window.location.reload();
          } else {
              localStorage.removeItem('reload');
          }
        }
    })();
    //this.checkCookie()
  }

  // checkCookie()
  // {
  //     let user = this.getCookie()
  //     if(user!=='' && user)
  //     {
  //         //if cookie exists- log user in
  //         console.log('cookie exists');
  //         console.log(user);
          
  //         this.userService.getUser(user).subscribe((data : any)=>{
  //           console.log(data);
            
  //           localStorage.setItem('CURRENT%USER', JSON.stringify(data._doc));
  //           this.router.navigate(['/home'], { relativeTo: this.route })
  //         })
          
  //     }
  //     else
  //     {
  //         console.log('no cookie');
  //     }
  
  // }
  
  // getCookie()
  // {
  //     let decodedCookie = decodeURIComponent(document.cookie)
  //     let cookieData = decodedCookie.split(';')
  //     if(cookieData)
  //     {
  //         for(let i =0; i<cookieData.length; i++)
  //         {
  //             if (cookieData[i].includes('username='))
  //             {
  //                 var uname = cookieData[i].split('=')[1]
  //                 return uname
  //             }
  //         }
  //     }
  //     return ''
  // }


}
