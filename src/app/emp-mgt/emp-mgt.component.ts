import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-emp-mgt',
  templateUrl: './emp-mgt.component.html',
  styleUrls: ['./emp-mgt.component.css']
})
export class EmpMgtComponent implements OnInit {
  validateForm!: FormGroup;
  relativeFrom:FormGroup ;
  empSeq: any;
  constructor(private fb: FormBuilder, private http: HttpClient, private notification: NzNotificationService) { }

  listOfData: any;
  saveButtonText = 'Save';
  isVisible = false;
  selectedRelationshipType: any;
  relativeList: any[]= [];
  selectedDep: any;
  selectedselectEmployee: any;
  isNotSelected: any;

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      seq:[null],
      empId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      relativeList:[null],
      salaryInfo:[null],
      supervisor:[null]
    });

    this.relativeFrom = this.fb.group({
      id:[null],
      name: [null, [Validators.required]],
      relationshipType: [null, [Validators.required]],

    });

    this.getAll();


  }

  submitForm(){

    if(this.saveButtonText === 'Update'){

      this.http.put(environment.url + 'emp/update-employee', this.validateForm.value).subscribe (value=>{
        this.getAll();
        this.validateForm.reset();
        this.updateMessage();
      });

    }else{


    this.http.post(environment.url + 'emp/save-employee', this.validateForm.value).subscribe (value=>{
      this.getAll();
      this.validateForm.reset();
      this.saveMessage();
    });

    }


    // this.validateForm.controls.empId.enable();
    this.saveButtonText = 'Save';


  }

  getAll(){
  
    this.http.get(environment.url + 'emp/getAll').subscribe (value=>{
      this.listOfData =value;
      console.log('Value',value);
      
    });

  }

  getData(data){

    this.saveButtonText = 'Update';
    this.validateForm.patchValue(data);
    this.empSeq =data.seq;
    if(data.relativeList!==null){
      this.relativeList =[...data.relativeList];
    }

  }

  getData2(data){

  }

  deleteEmployee(){

    if(this.saveButtonText !== 'Update'){
      return;
    }

    this.http.put(environment.url + 'emp/delete-employee', this.validateForm.value).subscribe (value=>{
      this.getAll();
      this.validateForm.reset();
      this.deleteMessage();
    });

    this.saveButtonText = 'Save';

  }


  relativeAdd(){
    this.http.put(environment.url + 'emp/add-relative/'+this.empSeq , this.relativeFrom.value).subscribe (value=>{
      this.getAll();
      this.saveMessage()
      this.relativeFrom.reset();

    });

    this.saveButtonText = 'Save';
  }


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }




  saveMessage( ){

    this.notification.blank(
      'Employee Creation',
      'Employee Save Sucessfully !',
      {
        nzStyle: {
          width: '600px',
          marginLeft: '-265px'
        },
        nzClass: 'test-class'
      }
    );

  }

  updateMessage( ){

    this.notification.blank(
      'Employee Update',
      'Employee Update Sucessfully !',
      {
        nzStyle: {
          width: '600px',
          marginLeft: '-265px'
        },
        nzClass: 'test-class'
      }
    );

  }

  deleteMessage( ){

    this.notification.blank(
      'Employee Delete',
      'Employee Delete Sucessfully !',
      {
        nzStyle: {
          width: '600px',
          marginLeft: '-265px'
        },
        nzClass: 'test-class'
      }
    );
    }
}

