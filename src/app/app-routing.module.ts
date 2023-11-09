import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GroupsModule } from './tab1/groups/groups.module';

const routes: Routes = [
 {
    path: '',
    loadChildren: () => import('./frontpage/frontpage.module').then( m => m.FrontpagePageModule)
  },
  {
    path: "tabs",
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },  {
    path: 'groupchat',
    loadChildren: () => import('./groupchat/groupchat.module').then( m => m.GroupchatPageModule)
  }

];
@NgModule({
  imports: [
    GroupsModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
