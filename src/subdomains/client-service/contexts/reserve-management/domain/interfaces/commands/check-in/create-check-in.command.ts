export interface ICreateCheckIn {
    checkInId: string;
    reserveId?: string;
    startDate: Date;
    recepsionistName: string;
    roomKeyId: string;
    guestId: string;
}