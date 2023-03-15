import { AggregateRootException } from '@sofka';

import { 
    RepairsAddedEventPublisherBase, 
    WorkStatusChangedEventPublisherBase
} from '../../events/publishers/support-ticket/repairs';

import { 
    DeviceDomainEntityBase, 
    SupportTicketDomainEntityBase, 
    RepairsDomainEntityBase 
} from '../../entities/support-ticket/';

import {
    ISupportTicketDomainService,
    IDeviceDomainService,
    IRepairsDomainService
} from '../../services/support-ticket/';


import {
    CloseTicket,   
    OpenNewTicket,
    AddDevice,
    AddRepair,
    ChangeWorkStatus,

} from './helpers';

import {
    SupportTicketClosedEventPublisherBase,   
    DeviceAddedEventPublisherBase,   
    NewTicketAddedEventPublisherBase

} from '../../events/publishers/support-ticket';

import { 
    IDeviceDomainEntity, 
    ISupportTicketEntity 
} from '../../entities/interfaces';

export class SupportTicketAggregate implements ISupportTicketDomainService, IDeviceDomainService, IRepairsDomainService {

    private readonly supportTicketService?: ISupportTicketDomainService;
    private readonly deviceService?: IDeviceDomainService;
    private readonly repairsService?: IRepairsDomainService;
    private readonly newTicketAddedEventPublisherBase?: NewTicketAddedEventPublisherBase;
    private readonly supportTicketClosedEventPublisherBase?: SupportTicketClosedEventPublisherBase; 
    private readonly deviceAddedEventPublisherBase?: DeviceAddedEventPublisherBase; 
    private readonly repairsAddedEventPublisherBase?: RepairsAddedEventPublisherBase;
    private readonly workStatusChangedEventPublisherBase?: WorkStatusChangedEventPublisherBase;

    constructor(
        {
            supportTicketService,
            repairsService,
            deviceService,
            newTicketAddedEventPublisherBase,
            supportTicketClosedEventPublisherBase,         
            deviceAddedEventPublisherBase,
            repairsAddedEventPublisherBase,
            workStatusChangedEventPublisherBase,

        }: {

            supportTicketService?: ISupportTicketDomainService,
            deviceService?: IDeviceDomainService,
            repairsService?: IRepairsDomainService,
            newTicketAddedEventPublisherBase?: NewTicketAddedEventPublisherBase,
            supportTicketClosedEventPublisherBase?: SupportTicketClosedEventPublisherBase,    
            deviceAddedEventPublisherBase?: DeviceAddedEventPublisherBase,    
            repairsAddedEventPublisherBase?: RepairsAddedEventPublisherBase,
            workStatusChangedEventPublisherBase?: WorkStatusChangedEventPublisherBase,

        }) {

        this.supportTicketService = supportTicketService;
        this.deviceService = deviceService;
        this.repairsService = repairsService;
        this.newTicketAddedEventPublisherBase = newTicketAddedEventPublisherBase;
        this.supportTicketClosedEventPublisherBase = supportTicketClosedEventPublisherBase;        
        this.deviceAddedEventPublisherBase = deviceAddedEventPublisherBase;        
        this.repairsAddedEventPublisherBase = repairsAddedEventPublisherBase;
        this.workStatusChangedEventPublisherBase = workStatusChangedEventPublisherBase;
    }

    // #region SUPPORT-TICKET methods


    /**
     * Opens a new Support ticket
     *
     * @param {IOpenNewTicketCommand} ticketData
     * @return {*}  {Promise<boolean>}
     * @memberof SupportTicketAggregate
     */
    async OpenNewTicket(ticketData: ISupportTicketEntity): Promise<ISupportTicketEntity | null > {

        if (!this.supportTicketService) {
            throw new AggregateRootException('InvoiceAggregate: "SupportTicketService" is not defined!');
        }
        if (!this.newTicketAddedEventPublisherBase) {
            throw new AggregateRootException('InvoiceAggregate: "NewTicketAddedEventPublisherBase" is not defined!');
        }

        return await OpenNewTicket(ticketData, this.supportTicketService, this.newTicketAddedEventPublisherBase);
    }


    /**
     * Closes the given ticket
     *
     * @param {ICloseTicketCommand} ticketData
     * @return {*}  {Promise<boolean>}
     * @memberof SupportTicketAggregate
     */
    async CloseTicket(ticketData: SupportTicketDomainEntityBase): Promise<boolean> {

        if (!this.supportTicketService) {
            throw new AggregateRootException('InvoiceAggregate: "SupportTicketService" is not defined!');
        }
        if (!this.supportTicketClosedEventPublisherBase) {
            throw new AggregateRootException('InvoiceAggregate: "TicketClosedEventPublisherBase" is not defined!');
        }

        return await CloseTicket(ticketData, this.supportTicketService, this.supportTicketClosedEventPublisherBase);
    }


   
    // #endregion


    // #region DEVICE methods


    /**
     * Add a new Device
     *
     * @param {IAddDeviceCommand} deviceData
     * @return {*}  {Promise<boolean>}
     * @memberof SupportTicketAggregate
     */
    async AddDevice(deviceData: DeviceDomainEntityBase): Promise<IDeviceDomainEntity | null> {

        if (!this.deviceService) {
            throw new AggregateRootException('InvoiceAggregate: "DeviceService" is not defined!');
        }
        if (!this.deviceAddedEventPublisherBase) {
            throw new AggregateRootException('InvoiceAggregate: "InvoiceGeneratedEventPublisherBase" is not defined!');
        }

        return await AddDevice(deviceData, this.deviceService, this.deviceAddedEventPublisherBase);
    }

    
   
    // #endregion


    // #region REPAIRS methods

    async AddRepair(repairData: RepairsDomainEntityBase): Promise<boolean> {

        if (!this.repairsService) {
            throw new AggregateRootException('InvoiceAggregate: "RepairsService" is not defined!');
        }
        if (!this.repairsAddedEventPublisherBase) {
            throw new AggregateRootException('InvoiceAggregate: "RepairsAddedEventPublisherBase" is not defined!');
        }

        return await AddRepair(repairData, this.repairsService, this.repairsAddedEventPublisherBase);
    }



    /**
     * Allows to change the repair work status ( true = active / false = finished )
     *
     * @param {IChangeWorkStatusCommand} repairData
     * @return {*}  {Promise<boolean>}
     * @memberof SupportTicketAggregate
     */
    async ChangeWorkStatus(repairData: RepairsDomainEntityBase): Promise<boolean> {

        if (!this.repairsService) {
            throw new AggregateRootException('InvoiceAggregate: "RepairsService" is not defined!');
        }
        if (!this.workStatusChangedEventPublisherBase) {
            throw new AggregateRootException('InvoiceAggregate: "WorkStatusChangedEventPublisherBase" is not defined!');
        }

        return await ChangeWorkStatus(repairData, this.repairsService, this.workStatusChangedEventPublisherBase);
    }


    // #endregion

}
