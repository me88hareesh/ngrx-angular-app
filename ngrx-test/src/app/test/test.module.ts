import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestRoutingModule } from './test-routing.module';
import { StoreModule, StoreFeatureModule } from '@ngrx/store';
import { TestOneComponent } from './test-one/test-one.component';
import { TestTwoComponent } from './test-two/test-two.component';
import { commonUserReducer } from './ngrx-store-files/common.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    TestOneComponent,
    TestTwoComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    AgGridModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}), 
    StoreModule.forFeature("userstore",commonUserReducer),
  ],
  exports:[
    TestOneComponent,
    TestTwoComponent
  ]
})
export class TestModule { }
