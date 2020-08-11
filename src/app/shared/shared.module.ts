import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { ToggleFullscreenDirective } from './fullscreen/toggle-fullscreen.directive';
import { CardRefreshDirective } from './card/card-refresh.directive';
import { CardToggleDirective } from './card/card-toggle.directive';
import { CardComponent } from './card/card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ParentRemoveDirective } from './elements/parent-remove.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalAnimationComponent } from './modal-animation/modal-animation.component';
import { ModalBasicComponent } from './modal-basic/modal-basic.component';
import { ToastyModule } from 'ng2-toasty';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { AnimatorModule } from 'css-animator';
import { DataFilterPipe } from './elements/data-filter.pipe';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { AgmCoreModule } from '@agm/core';
import { TodoService } from './todo/todo.service';
import { ClickOutsideModule } from 'ng-click-outside';
import { SpinnerComponent } from './spinner/spinner.component';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NotificationsService } from 'angular2-notifications';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TranslateModule } from '@ngx-translate/core';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastyModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    AnimatorModule,
    ScrollToModule.forRoot(),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCE0nvTeHBsiQIrbpMVTe489_O5mwyqofk' }),
    ClickOutsideModule,
    PerfectScrollbarModule,
    NgxSkeletonLoaderModule
  ],
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ToggleFullscreenDirective,
    CardRefreshDirective,
    CardToggleDirective,
    ParentRemoveDirective,
    CardComponent,
    SpinnerComponent,
    ModalAnimationComponent,
    ModalBasicComponent,
    DataFilterPipe,
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ToggleFullscreenDirective,
    CardRefreshDirective,
    CardToggleDirective,
    ParentRemoveDirective,
    CardComponent,
    SpinnerComponent,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ModalBasicComponent,
    ModalAnimationComponent,
    ToastyModule,
    SimpleNotificationsModule,
    AnimatorModule,
    DataFilterPipe,
    ScrollToModule,
    AgmCoreModule,
    ClickOutsideModule,
    PerfectScrollbarModule,
    TranslateModule
  ],
  providers: [
    MenuItems,
    TodoService,
    NotificationsService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class SharedModule { }
