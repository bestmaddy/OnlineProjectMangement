import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  tableSize: number = 10;
  page: number = 1;
  count: number = 0;
  productData: any
  ShowRow: boolean = true;
  productDto = new productDto
  Image: any;
  /* productDto = new FormGroup({
    title: new FormControl(),
    path: new FormControl(),
    description: new FormControl(),
    qty: new FormControl(),
    price: new FormControl(),
    date: new FormControl()
  }) */

  @ViewChild('productForm', { static: true })
  productForm!: NgForm;
  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.service.ProductObservable.subscribe(
      val => {
        console.log("val", val);
        this.productData = val;
      })
  }
  PlusClick() {
    this.ShowRow = !this.ShowRow;
  }
  DashClick() {
    this.ShowRow = !this.ShowRow;
    /*  this.productDto.title = "";
     this.productDto.description = "";
     this.productDto.qty = undefined;
     this.productDto.price = undefined;
     this.productDto.date = undefined;
     this.productDto.path = ""; */
  }

  SelectImage(event: any) {
    console.log("event.target.files.length", event.target.files)
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.Image = file;
    }
  }

  SaveProduct(productDto: productDto) {
    console.log("product dto", productDto);
    const formData = new FormData;
    formData.append('image', this.Image);
    formData.append('title', productDto.title!);
    formData.append('path', productDto.path!);
    formData.append('description', productDto.description!);
    formData.append('qty', productDto.qty!.toString());
    formData.append('price', productDto.price!.toString());
    formData.append('date', productDto.date!.toString());
    console.log("fomdata",formData)
    const data = { image: this.Image, productData: productDto }
    this.service.saveProduct(this.Image).subscribe(data => {
      console.log("saveProduct", data)
    })
    // this.service.sendMessage("saveProduct", data);
    /*     const formData = new FormData();
    
        const title = this.productDto.get('title')?.value;
        const path = this.productDto.get('path')?.value;
        const description = this.productDto.get('description')?.value;
        const qty = this.productDto.get('qty')?.value;
        const price = this.productDto.get('price')?.value;
        const date = this.productDto.get('date')?.value;
    
        if (title) {
          formData.append('title', title);
        }
        if (path) {
          formData.append('path', path);
        }
        if (description) {
          formData.append('description', description);
        }
        if (qty) {
          formData.append('qty', qty);
        }
        if (price) {
          formData.append('price', price);
        }
        if (date) {
          formData.append('date', date);
        } */

  }

  onTableDataChange(event: any) {
    this.page = event;
  }
}
export class productDto {
  title?: string;
  path?: string;
  description?: string;
  qty?: number;
  price?: number;
  date?: Date;
}
