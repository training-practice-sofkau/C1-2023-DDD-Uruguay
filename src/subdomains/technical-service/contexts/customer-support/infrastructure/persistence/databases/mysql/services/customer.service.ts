import { Injectable } from "@nestjs/common/";
import { CustomerDomainEntityBase } from "../../../../../domain/entities/invoice";
import { ICustomerDomainService } from '../../../../../domain/services/invoice/customer.domain-service';
import { CustomerRepository } from '../repositories/customer.repository';
import { CustomerMySqlEntity } from '../entities/customer.entity';

@Injectable()
export class CustomerMySqlService implements ICustomerDomainService {

    constructor(
        private readonly customerRepository: CustomerRepository
    ) { }

   
    /**
     * Updates the customer phone number
     *
     * @param {CustomerDomainEntityBase} data
     * @return {*}  {Promise<boolean>}
     * @memberof CustomerMySqlService
     */
    async ChangeCustomerPhone(data: CustomerDomainEntityBase): Promise<boolean> {
          
        if(this.customerRepository.update(data as CustomerMySqlEntity)) return await true;

        return false;
    }


    /**
     * Updates the customer email address
     *
     * @param {CustomerDomainEntityBase} data
     * @return {*}  {Promise<boolean>}
     * @memberof CustomerMySqlService
     */
    async ChangeCustomerEmail(data: CustomerDomainEntityBase): Promise<boolean>  {

        if(this.customerRepository.update(data as CustomerMySqlEntity)) return await true;

        return false;
    }

}