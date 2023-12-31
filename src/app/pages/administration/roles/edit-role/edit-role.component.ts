import { Component, OnInit, Input } from "@angular/core";
// importation form
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
@Component({
  selector: "app-edit-role",
  templateUrl: "./edit-role.component.html",
  styleUrls: ["./edit-role.component.scss"],
})
export class EditRoleComponent implements OnInit {
  @Input() selectedRole: any;
  typeValidationForm: FormGroup; // type validation form
  selected = "option2";
  constructor(public formBuilder: FormBuilder) {}
  typesubmit: boolean;
  ngOnInit(): void {
    this.initializeRoleForm();
    /**
     * Type validation form
     */
    /*  this.typeValidationForm = this.formBuilder.group({
      text: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      digits: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      number: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      alphanum: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
      textarea: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpwd: ['', Validators.required]
    }, {});*/
  }
  /**
   * Returns the type validation form
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

  initializeRoleForm() {
    this.typeValidationForm = this.formBuilder.group({
      name: [this.selectedRole ? this.selectedRole.name : ""],
      description: [this.selectedRole ? this.selectedRole.description : ""],
    });
  }
}
