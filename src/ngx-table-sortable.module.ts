import {ModuleWithProviders, NgModule} from "@angular/core";
import {NgxTableSortableDirective} from "./ngx-table-sortable.directive";

@NgModule({
    declarations: [NgxTableSortableDirective],
    exports: [NgxTableSortableDirective]
})
export class NgxTableSortableModule {
    public static forRoot(): ModuleWithProviders {
        return {ngModule: NgxTableSortableModule};
    }
}