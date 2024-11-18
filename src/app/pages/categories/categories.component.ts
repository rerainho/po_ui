import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from '../../shared/services/categories/services/categories.service';
import { Router } from '@angular/router';
import { PoPageDynamicTableActions } from '@po-ui/ng-templates';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories$!: Observable<any>;
  columns: Array<string> = ['id', 'name'];
  readonly fields: Array<any> = [
    { property: 'id', key: true, visible: true, label:"Código" },
    { property: 'name', label: 'Nome' },
    ];

    readonly actions: PoPageDynamicTableActions = {
      new: '/documentation/po-page-dynamic-edit',
      remove: true,
      removeAll: true
    };

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.categories$ = this.categoriesService.get();
  }

  goToForm(): void {
    this.router.navigate(['categories/categories-form']);
  }

  getColumnTitle(columnName: string): string {
    switch(columnName) {
      case 'id':
        return 'Código';
      case 'name':
        return 'Nome';
      default:
        return '';
    }
  }

  getColumnData(columnName: string, element: any): any {
    switch(columnName) {
      case 'id':
        return element.id;
      case 'name':
        return element.name;
      default:
        return '';
    }
  }
}
