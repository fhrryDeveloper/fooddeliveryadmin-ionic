"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var menu_items_1 = require("./menu-items/menu-items");
var accordion_1 = require("./accordion");
var toggle_fullscreen_directive_1 = require("./fullscreen/toggle-fullscreen.directive");
var card_refresh_directive_1 = require("./card/card-refresh.directive");
var card_toggle_directive_1 = require("./card/card-toggle.directive");
var card_component_1 = require("./card/card.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var parent_remove_directive_1 = require("./elements/parent-remove.directive");
var squeezebox_1 = require("squeezebox");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var forms_1 = require("@angular/forms");
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            ng_bootstrap_1.NgbModule.forRoot(),
            ngx_bootstrap_1.PaginationModule.forRoot(),
            squeezebox_1.SqueezeBoxModule
        ],
        declarations: [
            accordion_1.AccordionAnchorDirective,
            accordion_1.AccordionLinkDirective,
            accordion_1.AccordionDirective,
            toggle_fullscreen_directive_1.ToggleFullscreenDirective,
            card_refresh_directive_1.CardRefreshDirective,
            card_toggle_directive_1.CardToggleDirective,
            parent_remove_directive_1.ParentRemoveDirective,
            card_component_1.CardComponent
        ],
        exports: [
            accordion_1.AccordionAnchorDirective,
            accordion_1.AccordionLinkDirective,
            accordion_1.AccordionDirective,
            toggle_fullscreen_directive_1.ToggleFullscreenDirective,
            card_refresh_directive_1.CardRefreshDirective,
            card_toggle_directive_1.CardToggleDirective,
            parent_remove_directive_1.ParentRemoveDirective,
            card_component_1.CardComponent,
            squeezebox_1.SqueezeBoxModule,
            ng_bootstrap_1.NgbModule,
            ngx_bootstrap_1.PaginationModule,
            forms_1.FormsModule
        ],
        providers: [menu_items_1.MenuItems]
    })
], SharedModule);
exports.SharedModule = SharedModule;
