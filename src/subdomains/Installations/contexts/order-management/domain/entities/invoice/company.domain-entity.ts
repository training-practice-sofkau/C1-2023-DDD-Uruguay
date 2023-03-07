import { v4 as uuidv4 } from 'uuid';

import { CompanyIdValueObject, CompanyNameValueObject, CompanyBankAccountValueObject } from "../../value-objects/invoice";
import { ICompanyDomainEntity } from "../interfaces";

export class CompanyDomainEntityBase implements ICompanyDomainEntity {

    companyId?: string | CompanyIdValueObject;
    name?: string | CompanyNameValueObject;
    bankAccount?: string | CompanyBankAccountValueObject;
    createdAt?: number | Date;
    updatedAt?: number | Date;
    deletedAt?: number | Date;

    constructor( _data?: ICompanyDomainEntity ){
        if(_data?.companyId) this.companyId = _data.companyId;
        else this.companyId = uuidv4();

        if(_data?.bankAccount) this.bankAccount = _data.bankAccount;

        if(_data?.companyId) this.companyId = _data.companyId;

        this.createdAt = new Date();
    }

}