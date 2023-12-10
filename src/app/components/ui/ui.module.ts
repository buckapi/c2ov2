import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavHeaderComponent } from './navHeader/nav-header/nav-header.component';
import { DashboardHeaderComponent } from './dashboardHeader/dashboard-header/dashboard-header.component';
import { DezNavComponent } from './dezNav/dez-nav/dez-nav.component';
import { DashboardFooterComponent } from './dashboardFooter/dashboard-footer/dashboard-footer.component';
import { ChatBoxComponent } from './chatBox/chat-box/chat-box.component';
import { Router, RouterModule,ActivatedRoute } from '@angular/router';
import { Yeoman } from '@app/services/yeoman.service';
import { Butler } from '@app/services/butler.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavHeaderComponent,
    DashboardHeaderComponent,
    DezNavComponent,
    DashboardFooterComponent,
    ChatBoxComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  providers:[
    Yeoman,Butler
  ],
  exports:[
    NavHeaderComponent,DashboardHeaderComponent,DezNavComponent,DashboardFooterComponent,ChatBoxComponent
  ],
})
export class UiModule { }
