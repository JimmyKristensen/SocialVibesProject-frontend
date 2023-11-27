import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    ],
  exports: [RouterModule,ReactiveFormsModule,FormsModule]
})
export class Tab1PageRoutingModule {}
