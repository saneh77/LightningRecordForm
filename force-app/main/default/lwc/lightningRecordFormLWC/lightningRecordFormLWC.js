/*
============================================================
Author: Saneh Dhingana
Description: 
Created Date: 30-12-2024
Last Modified On: 20-05-2025
Last Modified By: Saneh Dhingana
============================================================
*/

import { LightningElement,api } from 'lwc';
export default class LightningRecordForm extends LightningElement {

    recordId = '';
    // all properties are exposed as public to be used as target config in xml file.
    @api recId;
    @api layouttype;
    @api objectApiName;
    @api fields;
    @api mode;
    @api column;
    @api recTypeId;
    @api density;
    @api title;

    // to contain list of fields for the form
    listoffield = [];


    connectedCallback() {
         // assign properties and handle fault causes
         this.layouttype = this.layouttype == 'None' ? '' : this.layouttype;
         this.recTypeId = this.recTypeId == undefined ? '' : this.recTypeId;
         this.mode = this.mode == undefined ? '' : this.mode;
         this.recordId = this.recId != undefined ? this.recId : '';

       // if specific fields are provided and create a list of fields to pass to the form
        if (this.fields != undefined) {
            let listoffield1 = this.fields.split(',');
            for (let i = 0; i < listoffield1.length; i++) {

                let object = {
                    "fieldApiName": listoffield1[i],
                    "objectApiName": this.objectApiName
                }

                this.listoffield.push(object);
            }
        } 
        // if no fields are  provided, use the object's all fields for the form
        else {
            this.listoffield = [];
            this.layouttype = 'Full';
        }
        


    }

    // after save handler 
    handleSuccess(event) {
        this.recId = event.detail.id;
        
    }
}