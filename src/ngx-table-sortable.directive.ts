import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SortingSettings} from "./sorting-settings";

@Directive({
    selector: '[ngxTableSortable]'
})
export class NgxTableSortableDirective implements OnInit, AfterViewInit {

    private headerCells: NodeList;

    @Input('ngxTableSortable')
    private sortingSettings: SortingSettings;
    @Output()
    private onSortingChanged = new EventEmitter();

    constructor(private el: ElementRef) {}

    ngOnInit() {
        if (this.sortingSettings == null) throw new Error('ngxTableSortable, attribute \'[ngxTableSortable]\' is required.');
    }

    ngAfterViewInit(): void {
        this.initHeaderCells();
        this.registerCellClickHandlers();
        this.toggleSortingClasses();
    }

    private initHeaderCells() {
        this.headerCells = this.el.nativeElement.querySelectorAll('thead tr th');
    }

    private registerCellClickHandlers() {
        Array.prototype.forEach.call(this.headerCells, (cell: HTMLTableCellElement) => {
            cell.addEventListener('click', (e) => {
                this.cellClickHandler(e.target);
            });
        })
    }

    private cellClickHandler(element: EventTarget) {
        this.sortingSettings.set((element as HTMLElement).dataset.field);
        this.toggleSortingClasses();

        this.onSortingChanged.next(this.sortingSettings);
    }


    private toggleSortingClasses() {
        Array.prototype.forEach.call(this.headerCells, (cell: HTMLTableCellElement) => {
            this.removeSortingClasses(cell);

            if (cell.dataset.field === this.sortingSettings.by) {
               this.addSortingClasses(cell);
            }
        });
    }

    private removeSortingClasses(element: HTMLElement) {
        element.classList.remove('sorted');
        element.classList.remove('asc');
        element.classList.remove('desc');
    }

    private addSortingClasses(element: HTMLElement) {
        element.classList.add('sorted');
        element.classList.add(this.sortingSettings.order.toLowerCase());
    }
}
