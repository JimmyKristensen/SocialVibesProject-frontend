import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 {
    path: '',
    loadChildren: () => import('./frontpage/frontpage.module').then( m => m.FrontpagePageModule)
  },
  {
    path: "tabs",
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: "invidChat",
    loadChildren: () => import('./invidchat/invidchat.module').then( m => m.InvidchatPageModule)
  },
  {
    path: "groupChat",
    loadChildren: () => import('./groupchat/groupchat.module').then( m => m.GroupchatPageModule)
  },
  {
    path: 'communitychat',
    loadChildren: () => import('./communitychat/communitychat.module').then( m => m.CommunitychatPageModule)
  },  {
    path: 'eventcreate',
    loadChildren: () => import('./eventcreate/eventcreate.module').then( m => m.EventcreatePageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
