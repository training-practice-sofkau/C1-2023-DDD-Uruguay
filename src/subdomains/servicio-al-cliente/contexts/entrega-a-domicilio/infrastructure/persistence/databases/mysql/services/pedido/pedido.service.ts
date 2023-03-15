import { Injectable } from "@nestjs/common";

import {
    EntradaMySqlEntity,
    BebidaMySqlEntity,
    PlatoPrincipalMySqlEntity,
    PostreMySqlEntity,
    PedidoMySqlEntity
} from "../../entities/pedido";

import { IPedidoDomainService } from "../../../../../../domain/services";
import {
    BebidaMySqlRepository,
    EntradaMySqlRepository,
    PedidoMySqlRepository,
    PlatoPrincipalMySqlRepository,
    PostreMySqlRepository
} from '../../repositories/pedido';


@Injectable()
export class PedidoMySqlService
    implements IPedidoDomainService<PedidoMySqlEntity> {

    constructor(
        private readonly pedidoRepository: PedidoMySqlRepository,
        private readonly entradaRepository: EntradaMySqlRepository,
        private readonly postreRepository: PostreMySqlRepository,
        private readonly platoPrincipalRepository: PlatoPrincipalMySqlRepository,
        private readonly bebidaRepository: BebidaMySqlRepository,
    ) { }


    crearPedido(pedido: PedidoMySqlEntity): Promise<PedidoMySqlEntity> {
        return this.pedidoRepository.create(pedido);
    }
    
    obtenerPedido(pedidoId: string): Promise<PedidoMySqlEntity> {
        return this.pedidoRepository.findById(pedidoId);
    }

    cambiarEstadoPedido(pedidoId: string, nuevoEstado: string): Promise<string> {
        return this.pedidoRepository.updateEstado(pedidoId, nuevoEstado);
    }

    cambiarPrecioPedido(pedidoId: string, nuevoPrecio: number): Promise<number> {
        return this.pedidoRepository.updatePrecio(pedidoId, nuevoPrecio);
    }


    crearEntrada(entrada: EntradaMySqlEntity): Promise<EntradaMySqlEntity> {
        return this.entradaRepository.create(entrada);
    }

    cambiarNombreEntrada(entradaId: string, nuevoNombre: string): Promise<string> {
        return this.entradaRepository.updateNombre(entradaId, nuevoNombre);
    }

    crearPlatoPrincipal(platoPrincipal: PlatoPrincipalMySqlEntity): Promise<PlatoPrincipalMySqlEntity> {
        return this.platoPrincipalRepository.create(platoPrincipal);
    }

    cambiarNombrePlatoPrincipal(platoPrincipalId: string, nuevoNombre: string): Promise<string> {
        return this.platoPrincipalRepository.updateNombre(platoPrincipalId, nuevoNombre);
    }

    cambiarGuarnicionPlatoPrincipal(platoPrincipalId: string, nuevaGuarnicion: string): Promise<string> {
        return this.platoPrincipalRepository.updateGuarnicion(platoPrincipalId, nuevaGuarnicion);
    }

    crearBebida(bebida: BebidaMySqlEntity): Promise<BebidaMySqlEntity> {
        return this.bebidaRepository.create(bebida);
    }

    obtenerBebida(bebidaId: string): Promise<BebidaMySqlEntity> {
        return this.bebidaRepository.findById(bebidaId);
    }

    cambiarNombreBebida(bebidaId: string, nuevoNombre: string): Promise<string> {
        return this.bebidaRepository.updateNombre(bebidaId, nuevoNombre);
    }

    cambiarTamañoBebida(bebidaId: string, nuevoTamaño: string): Promise<string> {
        return this.bebidaRepository.updateTamanio(bebidaId, nuevoTamaño);
    }

    crearPostre(postre: PostreMySqlEntity): Promise<PostreMySqlEntity> {
        return this.postreRepository.create(postre);
    }

    cambiarNombrePostre(postreId: string, nuevoNombre: string): Promise<string> {
        return this.postreRepository.updateNombre(postreId, nuevoNombre);
    }

    cambiarTamañoPostre(postreId: string, nuevoTamaño: string): Promise<string> {
        return this.postreRepository.updateTamanio(postreId, nuevoTamaño);
    }

    cambiarPostreEsPAraVeganos(postreId: string, nuevoEstado: boolean): Promise<boolean> {
        return this.postreRepository.updateEsParaVeganos(postreId, nuevoEstado);
    }

}