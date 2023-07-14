import { Component, Input, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
// importation form
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"],
})
export class AddUserComponent implements OnInit {
  typeValidationForm: FormGroup; // type validation form

  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService
  ) {}
  token = localStorage.getItem("token");
  typesubmit: boolean;
  headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Authorization", "Bearer " + this.token);
  ngOnInit(): void {
    /**
     * Type validation form
     */

    this.typeValidationForm = this.formBuilder.group(
      {
        nom: [""],
        password: [""],
        email: [""],
        text: [""],
        //   email: [
        //     "",
        ////     [
        //       Validators.required,
        ///       Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
        ///     ],
        //   ],
        url: [""],
        digits: [""],
        number: [""],
        alphanum: ["", ,],
        textarea: [""],
        //  password: ["", [Validators.required, Validators.minLength(6)]],
        confirmpwd: [""],
      },
      {}
    );
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
  addUser() {
    //  this.submitted = true;
    const data = {
      userName: this.typeValidationForm.controls.nom.value,
      password: this.typeValidationForm.controls.password.value,
    };
    // stop here if form is invalid

    ///   if (this.typeValidationForm.invalid) {
    //    return;
    //    } else {

    // console.log(this.params.toString());
    console.log(
      this.typeValidationForm.controls.nom.value,
      this.typeValidationForm.controls.password.value
    );

    this.userService.addUser(data, this.headers).subscribe(
      (res: any) => {
        //  localStorage.setItem("token", res.accesToken.toString());
        //  this.router.navigate(["/user-list"]);
        //  this.params = new URLSearchParams();
        console.log(res, "user added");
      },
      (error) => {
        console.log(error);
      }
    );

    //  }
  }
}
