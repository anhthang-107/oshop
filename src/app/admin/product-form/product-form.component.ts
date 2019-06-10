import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};

  constructor(
    categoryService: CategoryService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router){
    this.categories$ = categoryService.getCategories();
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {this.productService.get(id).take(1).subscribe(p => this.product = p);}
  }

  save(product) {
    this.productService.creat(product);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
