import { Repository} from "typeorm";
import { BillEntityDB } from "../entities/Bill-entity";
import { IRepositoriBase } from "./base";
import { InjectRepository } from "@nestjs/typeorm";
import { BadRequestException, NotFoundException } from "@nestjs/common";


export class BillRepository
    implements IRepositoriBase<BillEntityDB> {


        constructor(@InjectRepository(BillEntityDB)
        private readonly repository: Repository<BillEntityDB>) { }
    
   async  findById(IDBill: string): Promise<BillEntityDB> {
        const bill = await this.repository.findOneBy({ IDBill })
        if (!bill) throw new BadRequestException(`Factura con id ${IDBill} no encontrado`)
        return bill    }
    async create(entity: BillEntityDB): Promise<BillEntityDB> {
        return this.repository.save(entity)    }
    async update(IDBill: string, newBill: BillEntityDB): Promise<BillEntityDB> {
        const bill = await this.repository.findOneBy({ IDBill });
        if (bill) {
          const newEntity = {
            ...newBill,
            bill,
          };
          return this.repository.save(newEntity);
        }
        throw new NotFoundException(`Factura con id ${IDBill} no encontrado`);    }
   async  delete(IDBill: string): Promise<boolean> {
    const bill = await this.repository.findOneBy({IDBill  });
    if (bill) {
      await this.repository.remove(bill);
      return true;
    }
    throw new NotFoundException(`Factura con id ${IDBill} no encontrado`);
  }  
}