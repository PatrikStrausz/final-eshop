import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CartModelPublic, CartModelServer } from '../models/cart.model';
import { ProductModelServer } from '../models/product.model';
import { OrderService } from './order.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private SERVER_URL = 'http://localhost:8080/';

  private cartDataClient: CartModelPublic = {
    prodData: [{ quantity: 0, product_id: 0 }],
    total: 0,
  }; 


  private cartDataServer: CartModelServer = {
    data: [
      {
        product: undefined,
        quantity: 0,
      },
    ],
    total: 0,
  };y

  cartTotal$ = new BehaviorSubject<number>(0);
  // Data variable to store the cart information on the client's local storage

  cartDataObs$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private httpClient: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {
    this.cartTotal$.next(this.cartDataServer.total);
    this.cartDataObs$.next(this.cartDataServer);

    let info: CartModelPublic = JSON.parse(localStorage.getItem('cart'));

    if (info !== null && info !== undefined && info.prodData[0].quantity !== 0) {
      // assign the value to our data variable which corresponds to the LocalStorage data format
      this.cartDataClient = info;
      // Loop through each entry and put it in the cartDataServer object
      this.cartDataClient.prodData.forEach((p) => {
        this.productService
          .getSingleProduct(p.product_id)
          .subscribe((actualProdInfo: ProductModelServer) => {
            if (this.cartDataServer.data[0].quantity === 0) {
              this.cartDataServer.data[0].quantity = p.quantity;
              this.cartDataServer.data[0].product = actualProdInfo;
              
              this.CalculateTotal();
              this.cartDataClient.total = this.cartDataServer.total;
              localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
            } else {
              this.cartDataServer.data.push({
                quantity: p.quantity,
                product: actualProdInfo,
              });
              this.CalculateTotal();
              this.cartDataClient.total = this.cartDataServer.total;
              localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
            }
            this.cartDataObs$.next({ ...this.cartDataServer });
          });
      });
    }
  }

  CalculateSubTotal(index): number {
    let subTotal = 0;

    let p = this.cartDataServer.data[index];
    // @ts-ignore
    subTotal = p.product.price * p.quantity;

    return subTotal;
  }

  AddProductToCart(id: number, quantity?: number) {
  
    this.productService.getSingleProduct(id).subscribe((prod) => {
      console.log(prod.title)
  
      // If the cart is empty
      if (this.cartDataServer.data[0].product === undefined) {
        this.cartDataServer.data[0].product = prod;
        this.cartDataServer.data[0].quantity =
          quantity !== undefined ? quantity : 1;

      
        this.CalculateTotal();
        this.cartDataClient.prodData[0].quantity = this.cartDataServer.data[0].quantity;
        this.cartDataClient.prodData[0].product_id = prod.id;
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({ ...this.cartDataServer });
       
        this.toast.success(`${prod.title} added to the cart.`, 'Product Added', {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right',
        });
      } // END of IF
      // Cart is not empty
      else {
      
        console.log(prod.title)
        let index = this.cartDataServer.data.findIndex(
          (p) => p.product.id === prod.id,
        
        );

     

        // 1. If chosen product is already in cart array
        if (index !== -1) {
          if (quantity !== undefined && quantity <= prod.quantity) {
            // @ts-ignore
            this.cartDataServer.data[index].quantity =
              this.cartDataServer.data[index].quantity < prod.quantity
                ? quantity
                : prod.quantity;
          } else {
            // @ts-ignore
            this.cartDataServer.data[index].quantity < prod.quantity
              ? this.cartDataServer.data[index].quantity++
              : prod.quantity;
          }

          this.cartDataClient.prodData[index].quantity = this.cartDataServer.data[
            index
          ].quantity;
          this.toast.info(
            `${prod.title} quantity updated in the cart.`,
            'Product Updated',
            {
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right',
            }
          );
        }
        // 2. If chosen product is not in cart array
        else {
          this.cartDataServer.data.push({
            product: prod,
            quantity: 1,
          });
          this.cartDataClient.prodData.push({
            quantity: 1,
            product_id: prod.id,
          });
          this.toast.success(
            `${prod.title} added to the cart.`,
            'Product Added',
            {
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right',
            }
          );
        }
      
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartDataObs$.next({ ...this.cartDataServer });
      } // END of ELSE
    });
  }

  UpdateCartData(index, increase: Boolean) {
    let data = this.cartDataServer.data[index];
    if (increase) {
      // @ts-ignore
      data.quantity < data.product.quantity
        ? data.quantity++
        : data.product.quantity;
      this.cartDataClient.prodData[index].quantity = data.quantity;
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      this.cartDataObs$.next({ ...this.cartDataServer });
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    } else {
      // @ts-ignore
      data.quantity--;

      // @ts-ignore
      if (data.quantity < 1) {
        this.DeleteProductFromCart(index);
        this.cartDataObs$.next({ ...this.cartDataServer });
      } else {
        // @ts-ignore
        this.cartDataObs$.next({ ...this.cartDataServer });
        this.cartDataClient.prodData[index].quantity = data.quantity;
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
    }
  }

  DeleteProductFromCart(index) {
    /*    console.log(this.cartDataClient.prodData[index].prodId);
        console.log(this.cartDataServer.data[index].product.id);*/

    if (window.confirm('Are you sure you want to delete the item?')) {
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;

      if (this.cartDataClient.total === 0) {
        this.cartDataClient = { prodData: [{ quantity: 0, product_id: 0 }], total: 0 };
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      } else {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

      if (this.cartDataServer.total === 0) {
        this.cartDataServer = {
          data: [
            {
              product: undefined,
              quantity: 0,
            },
          ],
          total: 0,
        };
        this.cartDataObs$.next({ ...this.cartDataServer });
      } else {
        this.cartDataObs$.next({ ...this.cartDataServer });
      }
    }
    // If the user doesn't want to delete the product, hits the CANCEL button
    else {
      return;
    }
  }

  CheckoutFromCart(userId: number) {
    this.httpClient
      .post(`${this.SERVER_URL}/orders/payment`, null)
      .subscribe((res: { success: Boolean }) => {
        console.clear();

        if (res.success) {
          this.resetServerData();
          this.httpClient
            .post(`${this.SERVER_URL}/orders/new`, {
              user_id: userId,
              products: this.cartDataClient.prodData,
            })
            .subscribe((data: OrderConfirmationResponse) => {
              this.orderService.getSingleOrder(data.order_id).then((prods) => {
                if (data.success) {
                  const navigationExtras: NavigationExtras = {
                    state: {
                      message: data.message,
                      products: prods,
                      orderId: data.order_id,
                      total: this.cartDataClient.total,
                    },
                  };
                  this.spinner.hide();
                  this.router
                    .navigate(['/thankyou'], navigationExtras)
                    .then((p) => {
                      this.cartDataClient = {
                        prodData: [{ quantity: 0, product_id: 0 }],
                        total: 0,
                      };
                      this.cartTotal$.next(0);
                      localStorage.setItem(
                        'cart',
                        JSON.stringify(this.cartDataClient)
                      );
                    });
                }
              });
            });
        } else {
          this.spinner.hide();
          this.router.navigateByUrl('/checkout').then();
          this.toast.error(`Sorry, failed to book the order`, 'Order Status', {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right',
          });
        }
      });
      setTimeout(()=>{                        
       this.spinner.hide();
   }, 3000);
  }

  private CalculateTotal() {
    let Total = 0;

    this.cartDataServer.data.forEach((p) => {
      const { quantity } = p;
      const { price } = p.product;
      // @ts-ignore
      Total += quantity * price;
    });
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  private resetServerData() {
    this.cartDataServer = {
      data: [
        {
          product: undefined,
          quantity: 0,
        },
      ],
      total: 0,
    };
    this.cartDataObs$.next({ ...this.cartDataServer });
  }
}

interface OrderConfirmationResponse {
  order_id: number;
  success: Boolean;
  message: String;
  products: [
    {
      id: String;
      quantity: String;
    }
  ];
}
