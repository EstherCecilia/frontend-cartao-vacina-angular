import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

export interface RegistroElement {
  position: number;
  cod: string;
  dt: string;
  dose: number;
  vacina: string;
  lote: string;
  aplicador: string;
  usuario: string;
}

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'registros-app',
  styleUrls: ['./registros.component.css'],
  templateUrl: './registros.component.html',
})
export class RegistrosComponent implements AfterViewInit {
  constructor(public dialog: MatDialog, private http: HttpClient) {}
  displayedColumns: string[] = [
    'select',
    'position',
    'cod',
    'usuario',
    'vacina',
    'lote',
    'aplicador',
    'dt',
    'dose',
  ];
  dataSource = new MatTableDataSource<RegistroElement>([]);
  selection = new SelectionModel<RegistroElement>(true, []);
  faTrash = faTrash;
  faPen = faPen;
  color = '#673ab7';
  filter = false;
  acoes = false;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  ngOnInit() {
    // Simple GET request with response type <any>
    this.http
      .get<any>('https://posto-api-vacina.herokuapp.com/registro')
      .subscribe((data) => {
        if (Array.isArray(data)) {
          let aux = data.map((el, pos) => {
            return {
              position: pos + 1,
              cod: el.cod,
              dose: el.dose,
              dt: el.dt,
              vacina: el.vacina,
              usuario: el.usuario,
              lote: el.cod_lote,
              aplicador: el.aplicador,
            };
          });

          this.dataSource = new MatTableDataSource<RegistroElement>(aux);
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
    const dialogRef = this.dialog.open(DialogContentRegistro);
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
  checkboxLabel(row?: RegistroElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}

@Component({
  selector: 'dialog-add-registro',
  templateUrl: './adicionar.resgistro/add.registro.component.html',
  styleUrls: ['./adicionar.resgistro/add.registro.component.css'],
})
export class DialogContentRegistro {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogContentRegistro>
  ) {}
  vacinas: any[] = [];
  lotes: any[] = [];
  users: any[] = [];
  user: any;

  ngOnInit() {
    this.http
      .get<any>('https://posto-api-vacina.herokuapp.com/vacina')
      .subscribe((data) => {
        if (Array.isArray(data)) {
          this.vacinas = data;
        }
      });

    this.http
      .get<any>('https://posto-api-vacina.herokuapp.com/lote')
      .subscribe((data) => {
        if (Array.isArray(data)) {
          this.lotes = data;
        }
      });

    this.http
      .get<any>('https://posto-api-vacina.herokuapp.com/usuario')
      .subscribe((data) => {
        if (Array.isArray(data)) {
          this.users = data;
        }
      });
  }

  adicionaRegistro(
    usuario: string,
    vacina: string,
    lote: string,
    dose: string,
    dt: string,
    descricao: string
  ) {
    if (!usuario || !vacina || !lote || !dose || !dt) {
      this.toastr.info('Preencha os campos corretamente');
      return;
    }
    let userPerfil = localStorage.getItem('user');
    this.user = userPerfil && JSON.parse(userPerfil);

    let request = {
      cod: vacina + usuario,
      cod_vacina: vacina,
      cpf_aplicador: this.user.cpf,
      cpf_usuario: usuario,
      cod_lote: lote,
      dose,
      dt,
      descricao,
    };
    this.http
      .post<any>('https://posto-api-vacina.herokuapp.com/registro', request)
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
