import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { GroupsComponent } from './groups/groups.component';
import { FriendsComponent } from './friends/friends.component';
import { CommunitiesComponent } from './communities/communities.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
  path: 'Friends',
  component: FriendsComponent,
  },
  {
    path: 'Groups',
    component: GroupsComponent,
  },
  {
    path: 'Communities',
    component: CommunitiesComponent,
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
