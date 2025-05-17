import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AdminTableComponent } from "../../components/admin-table/admin-table.component";
@Component({
  selector: 'app-admin-panel-page',
  standalone: true,
  imports: [
    TableModule,
    AdminTableComponent
  ],
  templateUrl: './admin-panel-page.component.html',
  styleUrl: './admin-panel-page.component.scss'
})
export class AdminPanelPageComponent {

}
