import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CommonModelState } from '../ngrx-store-files/common.reducer';
import { UserModel } from '../ngrx-store-files/common.model';
import { addnewuser, getallusers } from '../ngrx-store-files/common.action';
import { ColDef } from 'ag-grid-community';
import { FormControl, FormGroup } from '@angular/forms';

function actionCellRenderer(params:any) {
  let eGui = document.createElement("div");

  let editingCells = params.api.getEditingCells();
  // checks if the rowIndex matches in at least one of the editing cells
  let isCurrentRowEditing = editingCells.some((cell:any) => {
    return cell.rowIndex === params.node.rowIndex;
  });

  if (isCurrentRowEditing) {
    eGui.innerHTML = `
<button  class="action-button update btn btn-success"  data-action="update"> update  </button>
<button  class="action-button cancel btn btn-primary"  data-action="cancel" > cancel </button>
`;
  } else {
    eGui.innerHTML = `
<button class="action-button edit btn btn-success"  data-action="edit" > edit  </button>
<button class="action-button delete btn btn-primary" data-action="delete" > delete </button>
`;
  }

  return eGui;
}

@Component({
  selector: 'app-test-one',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './test-one.component.html',
  styleUrl: './test-one.component.scss'
})
export class TestOneComponent implements OnInit {

  counter: number = 0;
  lstUsers: Array<UserModel> = [];
   gridApi:any;
   gridColumnApi:any;
  userform: FormGroup = new FormGroup({
    Name: new FormControl(''),
    Phone: new FormControl('')
  })

  columnDefs: ColDef[] = [
    { field: 'UserId' },
    { field: 'UserName' },
    { field: 'UserPhone' },
    {
      headerName: "action",
      minWidth: 150,
      cellRenderer: actionCellRenderer,
      editable: false,
      colId: "action"
    }
    // { field: 'Edit' }
  ];
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100
  };
  // rowData = [
  //   { make: 'Toyota', model: 'Celica', price: 35000 },
  //   { make: 'Ford', model: 'Mondeo', price: 32000 },
  //   { make: 'Porsche', model: 'Boxster', price: 72000 }
  // ];
  rowData: Array<any> = [];
  constructor(private commonDataStore: Store<CommonModelState>) {
  }

  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.LoadData();
    // this.http.get("https://www.ag-grid.com/example-assets/olympic-winners.json").subscribe((data) => {
    //   this.rowData = data;
    // });
  }

  ngOnInit(): void {
    // alert(1)
    this.initializeForm();
    // this.LoadUsers();
    // this.LoadData();
  }

  LoadUsers() {
    this.commonDataStore.dispatch(getallusers());
  }

  LoadData(){
    this.commonDataStore.select('userstore').subscribe((usersAry: any) => {
      this.rowData = usersAry;
    });
  }

  initializeForm() {
    this.userform.setValue({
      Name: 'AAA',
      Phone: '87888682888'
    });
  }

  onSubmit() {
    // console.log(this.userform.value);
    console.log(this.userform.value.Name);
    let usermodel = {
      UserId: this.counter++,
      UserName: this.userform.value.Name,
      UserPhone: this.userform.value.Phone
    }
    this.commonDataStore.dispatch(addnewuser(usermodel));
  }

  onCellClicked(params:any) {
    // Handle click event for action cells
    if (params.column.colId === "action" && params.event.target.dataset.action) {
      let action = params.event.target.dataset.action;
      alert(action);
      if (action === "edit") {
        params.api.startEditingCell({
          rowIndex: params.node.rowIndex,
          // gets the first columnKey
          colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
        });
      }

      if (action === "delete") {
        params.api.applyTransaction({
          remove: [params.node.data]
        });
      }

      if (action === "update") {
        params.api.stopEditing(false);
      }

      if (action === "cancel") {
        params.api.stopEditing(true);
      }
    }
  }

  onRowEditingStarted(params:any) {
    alert('onRowEditingStarted')
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true
    });
  }
  onRowEditingStopped(params:any) {
    alert('onRowEditingStopped')
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true
    });
  }

} 
