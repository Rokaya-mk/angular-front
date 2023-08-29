import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewOrderComponent } from './components/new-order/new-order.component';
import { PickupLocationComponent } from './components/new-order/pickup-location/pickup-location.component';
import { DropoffLocationComponent } from './components/new-order/dropoff-location/dropoff-location.component';
import { TruckTypeComponent } from './components/new-order/truck-type/truck-type.component';
import { ShipmentDetailsComponent } from './components/new-order/shipment-details/shipment-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/new-order/select-pickup',
    pathMatch: 'full'
  },
  {
    path: 'new-order',
    component: NewOrderComponent,
    children: [
      {
        path: 'select-pickup',
        component: PickupLocationComponent
      },
      {
        path: 'select-drop-off',
        component: DropoffLocationComponent
      },
      {
        path: 'select-truck-type',
        component: TruckTypeComponent
      },
      {
        path: 'shipment-details',
        component: ShipmentDetailsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewOrderRoutingModule { }
