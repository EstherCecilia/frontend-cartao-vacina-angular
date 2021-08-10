import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

export interface AplicadorElement {
  position: number;
  name: string;
  cpf: string;
  cr: string;
  tel: string;
  email: string;
  dt_nascimento: string;
  admin: boolean;
}

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'aplicador-app',
  styleUrls: ['./aplicador.component.css'],
  templateUrl: './aplicador.component.html',
})
export class AplicadorComponent implements AfterViewInit {
  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}
  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'cpf',
    'cr',
    'tel',
    'email',
    'dt_nascimento',
    'admin',
  ];
  dataSource = new MatTableDataSource<AplicadorElement>([]);
  selection = new SelectionModel<AplicadorElement>(true, []);
  faTrash = faTrash;
  faPen = faPen;
  color = '#673ab7';
  filter = false;
  acoes = false;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  ngOnInit() {
    // Simple GET request with response type <any>
    this.http
      .get<any>('https://posto-api-vacina.herokuapp.com/aplicador')
      .subscribe((data) => {
        if (Array.isArray(data)) {
          let aux = data.map((el, pos) => {
            return {
              position: pos + 1,
              name: el.name,
              cpf: el.cpf,
              cr: el.cr,
              tel: el.tel,
              email: el.email,
              dt_nascimento: el.dt_nascimento,
              admin: el.admin,
            };
          });

          this.dataSource = new MatTableDataSource<AplicadorElement>(aux);
        }
      });
  }

  ngAfterViewChecked() {
    let userPerfil = localStorage.getItem('user');

    if (userPerfil && JSON.parse(userPerfil).admin) {
      if (!this.acoes && this.selection.selected.length > 0) this.acoes = true;
      if (this.acoes && this.selection.selected.length === 0)
        this.acoes = false;
    }
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    let userPerfil = localStorage.getItem('user');

    if (!(userPerfil && JSON.parse(userPerfil).admin)) {
      this.toastr.error('Essa ação só é permitida ao admin');
    } else {
      const dialogRef = this.dialog.open(DialogContentAplicador);
    }
  }

  onChangeFilter() {
    this.filter = !this.filter;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: AplicadorElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}

@Component({
  selector: 'dialog-add-aplicador',
  templateUrl: './adicionar.aplicador/add.aplicador.component.html',
  styleUrls: ['./adicionar.aplicador/add.aplicador.component.css'],
})
export class DialogContentAplicador {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogContentAplicador>
  ) {}

  adicionaAplicador(
    name: string,
    cpf: string,
    tel: string,
    email: string,
    dt_nascimento: string,
    senha: string,
    cr: string,
    admin: boolean
  ) {
    if (
      !name ||
      !cpf ||
      !tel ||
      !email ||
      !dt_nascimento ||
      !senha ||
      !cr ||
      !admin
    ) {
      this.toastr.info('Preencha os campos corretamente');
      return;
    }

    let request = {
      name,
      cpf,
      tel,
      email,
      dt_nascimento,
      cr,
      senha,
      admin,
    };
    this.http
      .post<any>('https://posto-api-vacina.herokuapp.com/aplicador', request)
      .subscribe((data) => {
        if (!data.status) {
          this.toastr.error(data.mensagem);
        } else {
          console.log(data);
          this.toastr.success('Registro criada com sucesso!');
          this.dialogRef.close();
        }
      });
  }
}
