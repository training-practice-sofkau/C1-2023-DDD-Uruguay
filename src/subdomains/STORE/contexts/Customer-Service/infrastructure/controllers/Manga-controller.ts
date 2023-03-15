


import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import {  GetMangaCaseUse, UpdateMangaStockCaseUse, UpdateNameUseCase, UpdatePriceUseCase, UpdateStateUseCase } from '../../application';
import {  IGetManga } from '../../domain/interfaces/commands';
import {
    IMangaModifiedEventPublisher,
  IMangaObtainedEventPublisher,
} from '../messaging/publisher/order';
import {  INameMangaModifiedEventPublisher, IPrinceModifiedEventPublisher, IStateModifiedEventPublisher } from '../messaging/publisher/order/manga';
import {  MangaService } from '../persitence';
import { IUpdateMangaName } from '../utils/commands/order/IUpdateMangaName';
import { IupdateMangaPrice } from '../utils/commands/order/IupdateMangaPrice';
import { IUpdateMangaStockCommand } from '../utils/commands/order/IUpdateMangaStock';
import { IUpdateStateManga } from '../utils/commands/order/IUpdateStateManga';

@Controller('manga')
export class mangaController {
  constructor(
    private readonly mangaService: MangaService,
    private readonly getMangaEventPublisher: IMangaObtainedEventPublisher,
    private readonly ModifiedMangaStockingEventPublisher: IMangaModifiedEventPublisher,
    private readonly NameMangaModifiedEventPublisher: INameMangaModifiedEventPublisher,
    private readonly IPrinceModifiedEventPublisher: IPrinceModifiedEventPublisher,
    private readonly IStateModifiedEventPublisher: IStateModifiedEventPublisher,

  ) {}



  @Get()
  getManga(@Body() command: IGetManga) {
    const useCase = new  GetMangaCaseUse (this.mangaService,  this.getMangaEventPublisher)
    return useCase.execute(command)
    
  }

  

  @Put('UpdateMangaStock')
  updateMangaStock(@Body() command: IUpdateMangaStockCommand) {
    const useCase = new  UpdateMangaStockCaseUse (this.mangaService,  this.ModifiedMangaStockingEventPublisher)
    return useCase.execute(command)
    
  }



  @Put('UpdateMangaName')
  updateMangaName(@Body() command: IUpdateMangaName) {
    const useCase = new  UpdateNameUseCase(this.mangaService,  this.NameMangaModifiedEventPublisher)
    return useCase.execute(command)
    
  }
  
  @Put('UpdateMangaPrice')
  updateMangaPrice(@Body() command: IupdateMangaPrice) {
    const useCase = new  UpdatePriceUseCase (this.mangaService,  this.IPrinceModifiedEventPublisher)
    return useCase.execute(command)
    
  }
  
  @Put('UpdateMangaState')
  updateMangaState(@Body() command: IUpdateStateManga) {
    const useCase = new  UpdateStateUseCase (this.mangaService,  this.IStateModifiedEventPublisher)
    return useCase.execute(command)
    
  }

}




