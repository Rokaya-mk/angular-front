import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewOrderRoutingModule } from './new-order-routing.module';

import { NewOrderComponent } from './components/new-order/new-order.component';
import { PickupLocationComponent } from './components/new-order/pickup-location/pickup-location.component';
import { DropoffLocationComponent } from './components/new-order/dropoff-location/dropoff-location.component';
import { TruckTypeComponent } from './components/new-order/truck-type/truck-type.component';
import { ShipmentDetailsComponent } from './components/new-order/shipment-details/shipment-details.component';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [
    NewOrderComponent,
    PickupLocationComponent,
    DropoffLocationComponent,
    TruckTypeComponent,
    ShipmentDetailsComponent
  ],
  imports: [
    CommonModule,
    NewOrderRoutingModule,
    GoogleMapsModule
  ]
})
export class NewOrderModule { }
