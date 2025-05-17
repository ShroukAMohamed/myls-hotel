import { Component } from '@angular/core';
import { RoomsService } from '../../../admin/services/rooms.service';
import { TranslateService } from '@ngx-translate/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'houses-details',
  standalone: true,
  imports: [
    PaginatorModule
  ],
  templateUrl: './houses-details.component.html',
  styleUrl: './houses-details.component.scss'
})
export class HousesDetailsComponent {
  items: any[] = [];
  rows = 6; // Items per page
  first = 0; // First item index
  totalRecords = 0;
  loading = false;
  private currentPage = 0;
  pageCount = 0;

  constructor(private roomsService: RoomsService, public _TranslateService: TranslateService) { }

  ngOnInit() {
    this.loadPage(0);
    this.roomsService.getTotalCount().then(count => {
      this.totalRecords = count;
    });
  }

  loadPage(pageNumber: number) {
    this.loading = true;
    this.roomsService.loadPage('rooms', this.rows, pageNumber).subscribe({
      next: items => {
        this.items = items;
        this.currentPage = pageNumber;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  onPageChange(event: any) {
    // Handle both page numbers and next/prev
    this.loadPage(event.page);
  }

  nextPage() {
    this.loadPage(this.currentPage + 1);
  }

  prevPage() {
    this.loadPage(Math.max(0, this.currentPage - 1));
  }
}
