import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreFeatureModule, StoreModule } from '@ngrx/store';
import { commonUserReducer } from './ngrx-store-files/common.reducer';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes),
    // StoreModule.forFeature("userstore",commonUserReducer),
  ],
  exports: [RouterModule]
})
export class TestRoutingModule { }
