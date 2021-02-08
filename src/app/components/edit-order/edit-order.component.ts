import { AdminOrdersListComponent } from './../admin/admin-orders-list/admin-orders-list.component';
import { SnackbarService } from './../../services/snackbar.service';
import { OrderService } from 'src/app/services/order.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Order } from './../../models/order.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, ɵɵqueryRefresh } from '@angular/core';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css'],
})
export class EditOrderComponent implements OnInit {
  order: Order;

  selected;

  editForm = new FormGroup({
    selectFormControl: new FormControl('', Validators.required),
  });

  constructor(
    private orderService: OrderService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<EditOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.order = data.data;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.order.state = this.selected;

    this.orderService.updateOrder(this.order).subscribe((a) => {
      this.snackbarService.successMessage('Order successfuly updated');
    });

    this.dialogRef.close();
  }
}
