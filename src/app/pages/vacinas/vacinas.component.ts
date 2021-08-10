import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faTrash, faEye, faPen } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';

export interface VacinaElement {
  name: string;
  position: number;
  cod: string;
  dt_fabricacao: string;
  dt_validade: string;
  descricao: string;
}

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'vacinas-app',
  styleUrls: ['./vacinas.component.css'],
  templateUrl: './vacinas.component.html',
})
export class VacinasComponent implements AfterViewInit {
  constructor(public dialog: MatDialog, private http: HttpClient) {}
  displayedColumns: string[] = [
    'select',
    'position',
    'name',
    'cod',
    'dt_fabricacao',
    'dt_validade',
    'descricao',
  ];
  dataSource = new MatTableDataSource<VacinaElement>([]);
  selection = new SelectionModel<VacinaElement>(true, []);
  faTrash = faTrash;
  faEye = faEye;
  faPen = faPen;
  color = '#673ab7';
  filter = false;
  acoes = false;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  ngOnInit() {
    // Simple GET request with response type <any>
    this.http
      .get<any>('https://posto-api-vacina.herokuapp.com/vacina')
      .subscribe((data) => {
        if (Array.isArray(data)) {
          let aux = data.map((el, pos) => {
            return {
              position: pos + 1,
              cod: el.cod,
              dt_validade: el.dt_validade,
              name: el.name,
              dt_fabricacao: el.dt_fabricacao,
              descricao: el.descricao || '',
            };
          });

          this.dataSource = new MatTableDataSource<VacinaElement>(aux);
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
    const dialogRef = this.dialog.open(DialogContent);
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
  checkboxLabel(row?: VacinaElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}

@Component({
  selector: 'dialog-add-vacina',
  templateUrl: './adicionar.vacina/add.vacina.component.html',
  styleUrls: ['./adicionar.vacina/add.vacina.component.css'],
})
export class DialogContent {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogContent>
  ) {}

  

  adicionaVacina(
    name: string,
    cod: string,
    dt_fabricacao: string,
    dt_validade: string,
    descricao: string
  ) {
    if (!name || !cod || !dt_fabricacao || !dt_validade) {
      this.toastr.info('Preencha os campos corretamente');
      return;
    }
    let request = {
      name,
      cod,
      dt_fabricacao,
      dt_validade,
      descricao,
    };
    this.http
      .post<any>('https://posto-api-vacina.herokuapp.com/vacina', request)
      .subscribe((data) => {
        if (!data.status) {
          this.toastr.error(data.mensagem);
        } else {
          console.log(data);
          this.toastr.success("Vacina criada com sucesso!")
          this.dialogRef.close();
        }
      });
  }
}
