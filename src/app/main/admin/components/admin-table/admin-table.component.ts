import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { RoomsService } from '../../services/rooms.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'admin-table',
  standalone: true,
  imports: [
    TableModule,
    Dialog,
    ButtonModule,
    InputTextModule,
    ConfirmDialog,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.scss'
})
export class AdminTableComponent {
  rooms: any[] = [];
  visible: boolean = false;
  showUpdate: boolean = false;
  isUpdate: boolean = false;
  roomDocId: string = '';

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private roomsService: RoomsService) { }

  roomForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(`[0-9A-Za-z ]*$`)]),
    type: new FormControl('', [Validators.required, Validators.pattern(`[0-9A-Za-z ]*$`)]),
    description: new FormControl('', [Validators.required, Validators.pattern(`[0-9A-Za-z,. ]*$`)]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern(`[0-9]*$`)]),
  })
  public showAddDialog() {
    this.roomForm.reset();
    this.visible = true;
    this.isUpdate = false;
  }

  public showUpdateDialog(roomId: string) {
    console.log(roomId)
    this.roomForm.patchValue(this.rooms.find((room) => room.id === roomId));
    this.roomDocId = roomId;
    this.visible = true;
    this.isUpdate = true;
  }

  public getRooms() {
    this.roomsService.getAllRooms().then((data) => {
      this.rooms = data || [];
    });
  }

  private createId() {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  public addRoom(roomForm: FormGroup) {
    const roomData = roomForm.value;
    const roomId = this.createId();
    roomData.id = roomId;
    this.roomsService.addRoom(roomData, roomId).then(() => {
      this.getRooms();
    })
    this.visible = false;
  }

  public updateRoom(roomForm: FormGroup) {
    const roomData = roomForm.value;
    const roomId = this.roomDocId;
    console.log(roomId, roomData)
    this.roomsService.updateRoom(roomData, roomId).then(() => {
      this.getRooms();
    })
    this.visible = false;
  }

  public deleteRoom(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'danger',
      },
      acceptButtonProps: {
        label: 'confirm',
      },
      accept: () => {
        this.roomsService.deleteRoom(id).then(() => {
          this.getRooms();
        })
      },
      reject: () => {

      },
    });
  }
  ngOnInit() {
    this.getRooms();
  }
}
