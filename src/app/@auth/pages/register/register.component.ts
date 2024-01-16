import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { NB_AUTH_OPTIONS, NbAuthService } from "@nebular/auth";
import { getDeepFromObject } from "../helpers";
import { EMAIL_PATTERN } from "../constants";


@Component({
  selector: 'ngx-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxRegisterComponent implements OnInit {

  minLoginLength: number = this.getConfigValue(('forms.validation.fullName.minLength'));
  maxLoginLength: number = this.getConfigValue(('forms.validation.fullName.maxLength'));
  minLength: number = this.getConfigValue('forms.validation.password.minLength');
  maxLength: number = this.getConfigValue('forms.validation.password.maxLength');
  isFullNameRequired: boolean = this.getConfigValue('forms.validation.fullName.required');
  isEmailRequired: boolean = this.getConfigValue('forms.validation.email.required');
  isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');
  redirectDelay: number = this.getConfigValue('forms.register.redirectDelay');
  showMessages: any = this.getConfigValue('forms.register.showMessages');
  strategy: string = this.getConfigValue('forms.register.strategy');

  registerForm: FormGroup;
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    private fb: FormBuilder,
    protected router: Router) {
  }

  ngOnInit(): void {
    const loginValidators = [
      Validators.minLength(this.minLoginLength),
      Validators.maxLength(this.maxLoginLength),
    ];
    this.isFullNameRequired && loginValidators.push(Validators.required);

    const emailValidators = [
      Validators.pattern(EMAIL_PATTERN),
    ];
    this.isEmailRequired && emailValidators.push(Validators.required);

    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.registerForm = this.fb.group({
      fullName: this.fb.control('', [...loginValidators]),
      email: this.fb.control('', [...emailValidators]),
      password: this.fb.control('', [...passwordValidators]),
      confirmPassword: this.fb.control('', [...passwordValidators]),
      terms: this.fb.control(''),
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
  
}