import { BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SellerEntityDB } from "../entities/sellerEntityDb";
import { IRepositoriBase } from "./base";

export class SellerRepository
    implements IRepositoriBase<SellerEntityDB> {


    constructor(@InjectRepository(SellerEntityDB)
    private readonly repository: Repository<SellerEntityDB>) { }

    async findById(IdSeller: string): Promise<SellerEntityDB> {
        const Seller = await this.repository.findOneBy({ IdSeller })
        if (!Seller) throw new BadRequestException(`Factura con id ${IdSeller} no encontrado`)
        return Seller;
    }

    async create(entity: SellerEntityDB): Promise<SellerEntityDB> {
        return this.repository.save(entity)
    }

    async update(IdSeller: string, sellerEntity: SellerEntityDB): Promise<SellerEntityDB> {
        const Seller = await this.repository.findOneBy({ IdSeller });
        if (Seller) {
            const newEntity = {
                ...sellerEntity,
                Seller,
            };
            return this.repository.save(newEntity);
        }
        throw new NotFoundException(`Vendedor con id ${IdSeller} no encontrado`);
    }
    async delete(IdSeller: string): Promise<boolean> {
        const Seller = await this.repository.findOneBy({ IdSeller });
        if (Seller) {
            await this.repository.remove(Seller);
            return true;
        }
        throw new NotFoundException(`Vendedor con id ${IdSeller} no encontrado`);
    }

}