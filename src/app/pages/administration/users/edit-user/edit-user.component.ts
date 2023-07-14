import { Component, OnInit, Input } from "@angular/core";
import { Table } from "../user-list/user-list.model";
// importation form
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent implements OnInit {
  @Input() selectedUser: any;
  typeValidationForm: FormGroup; // type validation form
  selected = "option2";
  typesubmit: boolean;
  fakeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    /**
     * Type validation form
     */
    this.initializeUserForm();
  }
  /**
   * Returns the type validation form ??
   */
  get type() {
    return this.typeValidationForm.controls;
  }
  /**
   * Type validation form submit data
   */
  typeSubmit() {
    this.typesubmit = true;
  }
  getdata() {
    return null;
  }

  initializeUserForm() {
    this.typeValidationForm = this.formBuilder.group({
      name: [this.selectedUser ? this.selectedUser.name : ""],
      email: [this.selectedUser ? this.selectedUser.email : ""],
      login: [this.selectedUser ? this.selectedUser.login : ""],
      organisation: [this.selectedUser ? this.selectedUser.organisation : ""],
      role: [this.selectedUser ? this.selectedUser.role : ""],
    });

    // we need a better way of handling select:input value
    // where are you geting the list of"roles" from ??
    // role just fl html options
  }
}
