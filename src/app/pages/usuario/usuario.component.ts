import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

export interface UsuarioElement {
  position: number;
  name: string;
  cpf: string;
  cep: string;
  num: number;
  tel: string;
  email: string;
  dt_nascimento: string;
}

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'usuario-app',
  styleUrls: ['./usuario.component.css'],
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements AfterViewInit {
  constructor(public dialog: MatDialog, private http: HttpClient) {}
  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'cpf',
    'email',
    'dt_nascimento',
    'tel',
    'cep',
    'num',
  ];
  dataSource = new MatTableDataSource<UsuarioElement>([]);
  selection = new SelectionModel<UsuarioElement>(true, []);
  faTrash = faTrash;
  faPen = faPen;
  color = '#673ab7';
  filter = false;
  acoes = false;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  ngOnInit() {
    // Simple GET request with response type <any>
    this.http
      .get<any>('https://posto-api-vacina.herokuapp.com/usuario')
      .subscribe((data) => {
        if (Array.isArray(data)) {
          let aux = data.map((el, pos) => {
            return {
              position: pos + 1,
              name: el.name,
              cpf: el.cpf,
              cep: el.logradouro.cep,
              num: el.logradouro.num,
              tel: el.tel,
              email: el.email,
              dt_nascimento: el.dt_nascimento,
            };
          });

          this.dataSource = new MatTableDataSource<UsuarioElement>(aux);
        }
      });
  }

  ngAfterViewChecked() {
    if (!this.acoes && this.selection.selected.length > 0) this.acoes = true;
    if (this.acoes && this.selection.selected.length === 0) this.acoes = false;
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
    const dialogRef = this.dialog.open(DialogContentUsuario);
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
  checkboxLabel(row?: UsuarioElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}

@Component({
  selector: 'dialog-add-usuario',
  templateUrl: './adicionar.usuario/add.usuario.component.html',
  styleUrls: ['./adicionar.usuario/add.usuario.component.css'],
})
export class DialogContentUsuario {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogContentUsuario>
  ) {}
  bairro = '';
  logradouro = '';
  cidade = '';

  applyCep(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    if (value.length === 8) {
      // Simple GET request with response type <any>
      this.http
        .get<any>(`https://viacep.com.br/ws/${value}/json/`)
        .subscribe((data) => {
          console.log(data);
          this.bairro = data.bairro;
          this.logradouro = data.logradouro;
          this.cidade = data.localidade;
        });
    }
  }

  adicionaUsuario(
    name: string,
    cpf: string,
    tel: string,
    email: string,
    dt_nascimento: string,
    cep: string,
    numero: string
  ) {
    if (!name || !cpf || !tel || !email || !dt_nascimento || !cep || !numero) {
      this.toastr.info('Preencha os campos corretamente');
      return;
    }

    let request = {
      name,
      cpf,
      tel,
      email,
      dt_nascimento,
      logradouro: { cep, bairro: this.bairro, rua: this.logradouro, num:numero },
      senha: cpf,
      notification:true,
    };
    this.http
      .post<any>('https://posto-api-vacina.herokuapp.com/usuario', request)
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
