// communities.module.ts
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { CommunitiesComponent } from './communities.component';

@NgModule({
  declarations: [CommunitiesComponent],
  imports: [SharedModule],
})
export class CommunitiesModule {}
