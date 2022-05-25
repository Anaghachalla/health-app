import { Component, OnInit } from '@angular/core';
import { UserDetailsService } from '../user-details.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-medicines-list',
  templateUrl: './medicines-list.component.html',
  styleUrls: ['./medicines-list.component.css', '../common-styles.css']
})
export class MedicinesListComponent implements OnInit{

  constructor(
    public userService : UserDetailsService,
    public router:Router,
    private route: ActivatedRoute
  ) { }

  medicines : any
  cart :  any
  user: any
  total_cost=0
  unii: any
  med_details:any
  show_details_popup = false

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('CURRENT%USER')|| '{}')
    this.userService.getCartData(this.user.username).subscribe((data)=>{
      
      if((data as any).status==='success')
      {
        if((data as any).data!=='')
        {
          this.cart= (data as any).data._doc.items
          //console.log(this.cart);
        }
        
      }
      else
      {
        console.log((data as any).message);
      }
      
      if(this.cart)
      {
        for(let i=0; i<this.cart.length;i++)
        {
          this.total_cost = this.cart[i].quantity*this.cart[i].cost + this.total_cost
        }
      }
      
      
      
    })


  }


  getMedicines()
  {
    var search = document.getElementById('search-bar') as HTMLInputElement
    this.userService.getMedicineData(search.value).subscribe(data=>{
      this.medicines= data
    })
  }

  addToCart(unii: any, name: any, cost : any)
  {
    var quant = document.getElementById(unii) as HTMLInputElement

    if((+quant.value) >0)
    {

      var items = {
        unii: unii,
        name: name,
        cost: cost.slice(-2),
        quantity: +quant.value
      }
  
      if(this.cart)
      {
        var exists = this.cart.find((med : any) => {
          return med.unii===unii
        });
        
        if(!exists)
        {
          this.cart.push(items)
        }
        else
        {
          this.cart.forEach((med : any) => {
            if(med.unii===unii)
            {
              med.quantity= (+items.quantity)
            }
          });
        }
        
      }
      else
      {
        this.cart = []
        this.cart.push(items)
      }
      console.log(this.cart);
      
      this.userService.saveCartData(this.user.username ,this.cart).subscribe(data=>{
        this.inputChange()
        
    })
    }
  }

  showDetails(unii: any)
  {
    this.show_details_popup=true
    this.unii = unii
    var not_popup = document.getElementsByClassName('not-popup')
    for(let i=0; i<not_popup.length; i++)
    {
      (not_popup[i] as HTMLDivElement).style.filter = 'blur(10px)'
    }
    this.userService.getOneMed(unii).subscribe((data:any)=>{
      this.med_details = data
      console.log(this.med_details);
      
    })
  }
  closePopup(value: boolean)
  {
    this.show_details_popup= value
    var not_popup = document.getElementsByClassName('not-popup')
    for(let i=0; i<not_popup.length; i++)
    {
      (not_popup[i] as HTMLDivElement).style.filter = 'blur(0px)'
    }
  }

  changeQuantity(unii: any)
  {
    var cart_inp = document.getElementById(`cart-${unii}`) as HTMLInputElement
    if((+cart_inp.value) == 0)
    {
      this.cart = this.cart.filter((med : any) => { return med.unii!==unii })
    }
    else
    {
      this.cart.forEach((med : any) => {
        if(med.unii===unii)
        {
          med.quantity= (+cart_inp.value)
        }
      });
    }
    this.userService.saveCartData(this.user.username ,this.cart).subscribe(data=>{
      this.inputChange()
    })
  }
  inputChange()
  {
    this.total_cost=0
    for(let i=0; i<this.cart.length;i++)
      {
        this.total_cost = this.cart[i].quantity*this.cart[i].cost + this.total_cost
      }
  }

  cartCheckout()
  {
    if(this.cart.length===0)
    {
      alert('Cart is empty')
    }
    else
    {
      var div = document.getElementById('checkout') as HTMLDivElement
      div.style.display= 'inherit'
    }
  }

  cancelOrder()
  {
    var div = document.getElementById('checkout') as HTMLDivElement
    div.style.display= 'none'
  }

  confirmOrder()
  {
    var order = {
      username: this.user.username,
      items: this.cart,
      order_total: this.total_cost
    }
    this.userService.placeOrder(order).subscribe(data=>{
      console.log(data);
      this.userService.removeCartData(this.user.username).subscribe(data=>{
        console.log(data);
        this.cart=undefined
        this.cancelOrder()
      })
      
    })
  }

}
