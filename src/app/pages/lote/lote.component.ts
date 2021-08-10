import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';

export interface LoteElement {
  position: number;
  cod: string;
  dt_criacao: string;
  fabricante: string;
  quantidade: number;
  cod_vacina: string;
}

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'lote-app',
  styleUrls: ['./lote.component.css'],
  templateUrl: './lote.component.html',
})
export class LoteComponent implements AfterViewInit {
  constructor(public dialog: MatDialog, private http: HttpClient) {}
  displayedColumns: string[] = [
    'select',
    'position',
    'cod',
    'dt_criacao',
    'cod_vacina',
    'quantidade',
  ];
  dataSource = new MatTableDataSource<LoteElement>([]);
  selection = new SelectionModel<LoteElement>(true, []);
  faTrash = faTrash;
  faPen = faPen;
  color = '#673ab7';
  filter = false;
  acoes = false;
  removeAcao = false;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  ngOnInit() {
    // Simple GET request with response type <any>
    this.http
      .get<any>('https://posto-api-vacina.herokuapp.com/lote')
      .subscribe((data) => {
        if (Array.isArray(data)) {
          let aux = data.map((el, pos) => {
            return {
              position: pos,
              cod: el.cod,
              dt_criacao: el.dt_criacao,
              cod_vacina: el.cod_vacina,
              fabricante: el.fabricante,
              quantidade: el.quantidade,
            };
          });

          this.dataSource = new MatTableDataSource<LoteElement>(aux);
        }
      });
  }

  ngAfterViewChecked() {
    if (!this.acoes && this.selection.selected.length > 0) {
      this.removeAcao = true;
      this.acoes = this.selection.selected.length === 1;
    }
    if (this.acoes && this.selection.selected.length === 0) {
      this.removeAcao = false;
    }

    if (this.acoes && this.selection.selected.length !== 1) {
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
    const dialogRef = this.dialog.open(DialogContentLote);
  }

  remove() {
    console.log(this.selection.selected);
    // this.selection.selected.map((el) => {
    //   this.http
    //     .delete<any>('https://posto-api-vacina.herokuapp.com/lote', {
    //       cod: el.cod,
    //     })
    //     .subscribe((data) => {
    //       if (!data.status) {
    //         console.log(data.mensagem);
    //       } else {
    //         // localStorage.setItem('user', JSON.stringify(data.data));
    //         console.log(data);
    //       }
    //     });
    // });
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
  checkboxLabel(row?: LoteElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}

@Component({
  selector: 'dialog-add-lote',
  templateUrl: './adicionar.lote/add.lote.component.html',
  styleUrls: ['./adicionar.lote/add.lote.component.css'],
})
export class DialogContentLote {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<DialogContentLote>
  ) {}
  vacinas: any[] = [];

  ngOnInit() {
    this.http
      .get<any>('https://posto-api-vacina.herokuapp.com/vacina')
      .subscribe((data) => {
        if (Array.isArray(data)) {
          this.vacinas = data;
        }
      });
  }

  adicionaLote(
    numero: string,
    vacina: string,
    quantidade: string,
    date_fabricacao: string,
    fabricante: string
  ) {
    if (!numero || !vacina || !quantidade || !date_fabricacao || !fabricante) {
      this.toastr.info('Preencha os campos corretamente');
      return;
    }
    let request = {
      cod: numero,
      cod_vacina: vacina,
      quantidade,
      fabricante,
      dt_criacao: date_fabricacao,
    };
    this.http
      .post<any>('https://posto-api-vacina.herokuapp.com/lote', request)
      .subscribe((data) => {
        if (!data.status) {
          this.toastr.error(data.mensagem);
        } else {
          console.log(data);
          this.toastr.success('Lote criada com sucesso!');
          this.dialogRef.close();
        }
      });
  }
}
