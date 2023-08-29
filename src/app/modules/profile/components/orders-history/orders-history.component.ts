import { Component, ViewChild, OnInit } from '@angular/core';
import { NgxMasonryOptions, NgxMasonryComponent } from 'ngx-masonry';
import { UserProfileService } from '../../services/user-profile.service';

export interface Order {
  id: number,
  user_id: number,
  car_id: number,
  shipment_type_id: number,
  pick_up_address: string,
  drop_of_address: string,
  spoil_quickly: boolean,
  breakable: boolean,
  size: number,
  weight_ton: number,
  ton_price: number,
  total_price: number,
  shipping_date: string,
  desc: string,
  notes: string,
  status: string
};

interface OrderStore {
  cached?: Order[];
  refined?: Order[];
  stamp?: Date;
}

@Component({
  selector: 'naw-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css']
})
export class OrdersHistoryComponent {
  selection?: string;
  reset?: string;
  store: OrderStore = {};

  @ViewChild(NgxMasonryComponent)
  masonry?: NgxMasonryComponent;

  masonryOptions: NgxMasonryOptions = {
    itemSelector: '.order-item',
  }

  constructor(private profileService: UserProfileService) { }

  ngOnInit() {
    this.profileService.getOrdersByUserId().subscribe({
      next: (response) => {
        console.log(response);
        this.store.refined = response.data.orders
      },
      error: (err) => {
        console.log('Error occurred:', err);
      }
    });
    // let data =

    // this.selection = 'all';
    // this.store.cached = data;
    // this.store.refined = data.sort((a, b) => a.id - b.id);
  }

  public filter(status: string) {
    this.store.refined = this.store.cached?.filter(p => p.status == status || status == 'all');
    
    // this.store.refined = this.store.cached
    //   .filter(p => p.status == status || status == 'all');
    // this.store.stamp = new Date();
    // this.masonry?.reloadItems();
  }

}
