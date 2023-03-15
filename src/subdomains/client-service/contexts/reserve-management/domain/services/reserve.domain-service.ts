import {
    CustomerDomainEntity,
    ReserveDomainEntity,
    RoomDomainEntity
} from "../entities";
import {
    IAddCustomer,
    IAddRoom,
    ICreateReserve,
    IGetRoom,
    IUpdateEndDate,
    IUpdateNumberOfGuests,
    IUpdateStartDate
} from "../interfaces";

export interface IReserveDomainService<T extends ReserveDomainEntity = ReserveDomainEntity> {

    createReserve(reserve: T): Promise<T>;

    addRoom(room: IAddRoom): Promise<RoomDomainEntity>;

    addCustomer(customer: CustomerDomainEntity): Promise<CustomerDomainEntity>;

    updateStartDate(data: IUpdateStartDate): Promise<ReserveDomainEntity>;

    updateEndDate(data: IUpdateEndDate): Promise<ReserveDomainEntity>;

    updateNumberOfGuests(data: IUpdateNumberOfGuests): Promise<ReserveDomainEntity>;

    getCustomer(data: string): Promise<CustomerDomainEntity>;

    getRoom(data: string): Promise<RoomDomainEntity>;
}