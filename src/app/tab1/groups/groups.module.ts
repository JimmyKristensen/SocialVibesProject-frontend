// groups.module.ts
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { GroupsComponent } from './groups.component';

@NgModule({
  declarations: [GroupsComponent],
  imports: [SharedModule],
})
export class GroupsModule {}
