import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  Output,
  EventEmitter,
} from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { Observable } from "rxjs";
// Importation pour la table
import { Table } from "./user-list.model";
import { tableData } from "./data-user";
import { AdvancedService } from "./user-list.service";
import { UserListDirective, SortEvent } from "./user-list.directive";
// Importation pour les modals
import Swal from "sweetalert2";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import jwt_decode from "jwt-decode";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
//import { error } from "console";
import { AccountService } from "src/app/services/account.service";
@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
  providers: [AdvancedService, DecimalPipe],
})
export class UserListComponent implements OnInit {
  //
  addModal: NgbModal;
  // bread crum data
  breadCrumbItems: Array<{}>;
  // Table data

  token: string | null;
  tableData: Table[];
  selectedUser: Table;
  public selected: any;
  hideme: boolean[] = [];
  tables$: Observable<Table[]>;
  total$: Observable<number>;
  refreshToken: string | null;
  @ViewChildren(UserListDirective) headers: QueryList<UserListDirective>;
  public isCollapsed = true;
  message = "";
  constructor(
    public service: AdvancedService,
    private modalService: NgbModal,
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.refreshToken = localStorage.getItem("refreshToken");
    this.tables$ = service.tables$;
    this.total$ = service.total$;
    //   console.log(this.selectedUser);
    //    this.token = localStorage.getItem("token");

    // if (this.token) {
    // Decode the JWT token
    // const decodedToken: any = jwt_decode(this.token);

    // Access the data in the token
    //  const claimValue = decodedToken.sub;

    // Print the extracted data
    //   console.log(this.token);
    //  console.log(claimValue);
    //  }
  }

  ngOnInit(): void {
    const data = {
      username: "admin",
    };

    this.breadCrumbItems = [
      { label: "Administration" },
      { label: "Gestion Utilisateurs", active: true },
    ];
    /**
     * fetch data
     */
    this._fetchData();

    // Access the data in the token

    // Print the extracted data
  }
  /**
   * fetches the table value
   */
  _fetchData() {
    this.tableData = tableData;
    for (let i = 0; i <= this.tableData.length; i++) {
      this.hideme.push(true);
    }
  }
  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  /**
   * Delete Modal method
   */
  confirm() {
    Swal.fire({
      title: "Etes-vous sûre?",
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#34c38f",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Oui, Supprimez-le!",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Supprimé!", "Votre utilisateur a été supprimé", "success");
      }
    });
  }
  /**
   * Open add modal
   * @param content modal content
   */
  openModal(content: any, table: any) {
    this.modalService.open(content, { windowClass: "modal-holder" });
    console.log(content);
  }
  onEdit(user: Table) {
    console.log(user);
    this.selectedUser = user;
    console.log(this.selectedUser);
  }
  get() {
    this.accountService.getUser().subscribe(
      (res: any) => {
        //  console.log(object)
        //  localStorage.setItem("token", res.accesToken.toString());
        //  this.router.navigate(["/user-list"]);
        //  this.params = new URLSearchParams();
        console.log(res);
        this.message = `hi ${res.userName}`;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
