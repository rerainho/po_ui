import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoPageDynamicTableActions } from '@po-ui/ng-templates';
import { TasksService } from '../../../shared/services/tasks/services/tasks.service';
import { PoDialogService, PoDynamicFormField, PoNotification, PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.css']
})
export class TasksFormComponent implements OnInit {
 
  id: string ='';
  operation: string ='new';
  task: any;

  readonly fields: Array<PoDynamicFormField> = [
    { property: 'id', required: true, label: 'Código', gridLgColumns: 1, gridMdColumns: 1, gridSmColumns: 12 },
    { property: 'title', required: true, label: 'Título', gridLgColumns: 4, gridMdColumns: 4, gridSmColumns: 12 },
    { property: 'category', required: true, optionsService: 'http://localhost:3000/categories', fieldValue: 'id', fieldLabel: 'name', label: 'Categoria',  gridLgColumns: 4, gridMdColumns: 4, gridSmColumns: 12 },
    { property: 'status', required: true, optionsService: 'http://localhost:3000/status', fieldValue: 'id', fieldLabel: 'description', label: 'Status', gridLgColumns: 3, gridMdColumns: 3, gridSmColumns: 12 }
  ];

  readonly actions: Array<PoPageAction> = [
    { label: 'Salvar', action: this.saveTask.bind(this) },
    { label: 'Cancelar', action: this.cancel.bind(this) }
  ]
  


  constructor(
    private activatedRoute: ActivatedRoute,
    private tasksService: TasksService, 
    private router: Router,
    private poDialogService: PoDialogService,
    private poNotificationService: PoNotificationService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.setOperation();
    if (this.operation === 'edit') {
      this.getTask();
    }
  }
  setOperation(): void {
  this.id ? this.operation = 'edit' :  this.operation = 'new';
}
  getTitle(): string {
  return this.operation === 'new' ? 'Incluir tarefa' : 'Editar tarefa';
}

  getForm(event:any): void{
  this.task = event.value;
  console.log(this.task);

}

  getTask(): void{
  this.tasksService.getById(parseInt(this.id)).subscribe({
    next: (task: any) => {this.task = task[0]; console.log(task)}
  })
}

cancel(): void {
  this.poDialogService.confirm({
    title: 'Cacenlar',
    message: 'As informações não ficarão salvas. Tem certeza que deseja cancelar?',
    confirm: () => this.router.navigate([''])
  })}

  saveTask(): void {
    let message: string = this.operation === 'new' ? 'Registro incluído com sucesso.' : 'Registro alterado com sucesso.'
    this.poNotificationService.success(message);
    this.router.navigate(['']);}
}