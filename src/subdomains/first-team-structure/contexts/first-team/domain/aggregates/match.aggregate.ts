import {
  IMatchDomainEntity,
  IRivalDomainEntity,
  IStadiumDomainEntity,
  MatchDomainEntity,
  RivalDomainEntity,
  StadiumDomainEntity,
  TeamDomainEntity,
} from '../entities';
import {
  IMatchDomainService,
  IRivalDomainService,
  IStadiumDomainService,
} from '../services';
import { AggregateRootException } from 'src/libs';
import { IUpdateDateCommand, IUpdateRivalTownCommand, IUpdateStadiumCapacity, IUpdateStadiumSquareMeters } from '../interfaces';
import { MatchAggregateHelper } from './interfaces/match-helper';

export class MatchAggregate implements IMatchDomainService, IRivalDomainService, IStadiumDomainService {
  
  constructor(private readonly matchAggregateHelper: MatchAggregateHelper) {}
  async getTeam(id: string): Promise<TeamDomainEntity> {
    if (!this.matchAggregateHelper.matchService)
      throw new AggregateRootException('Stadium service undefined');

      const result = await this.matchAggregateHelper.matchService.getTeam(id);
      return result;
  }
  async getStadium(id: string): Promise<StadiumDomainEntity> {
    if (!this.matchAggregateHelper.stadiumService)
      throw new AggregateRootException('Stadium service undefined');

      const result = await this.matchAggregateHelper.stadiumService.getStadium(id);
      return result;
  }
  async getRival(id: string): Promise<RivalDomainEntity> {
    if (!this.matchAggregateHelper.rivalService)
      throw new AggregateRootException('Rival service undefined');

      const result = await this.matchAggregateHelper.rivalService.getRival(id);
      return result;
  }
  async getMatch(id: string): Promise<MatchDomainEntity> {
    if (!this.matchAggregateHelper.matchService)
      throw new AggregateRootException('Match service undefined');
      
      const result = await this.matchAggregateHelper.matchService.getMatch(id);
      return result;
  }
  async registerMatch(match: IMatchDomainEntity): Promise<MatchDomainEntity> {
    if (!this.matchAggregateHelper.matchService)
      throw new AggregateRootException('Match service undefined');
    if (!this.matchAggregateHelper.registeredMatchEventPublisher)
      throw new AggregateRootException('Event Publisher undefined');

    const result = await this.matchAggregateHelper.matchService.registerMatch(match);
    this.matchAggregateHelper.registeredMatchEventPublisher.response = result;
    this.matchAggregateHelper.registeredMatchEventPublisher.publish();
    return result;
  }
  async addRival(rival: IRivalDomainEntity): Promise<RivalDomainEntity> {
    if (!this.matchAggregateHelper.matchService)
      throw new AggregateRootException('Match service undefined');
    if (!this.matchAggregateHelper.addedRivalEventPublisher)
      throw new AggregateRootException('Event Publisher undefined');

    const result = await this.matchAggregateHelper.matchService.addRival(rival);
    this.matchAggregateHelper.addedRivalEventPublisher.response = result;
    this.matchAggregateHelper.addedRivalEventPublisher.publish();
    return result;
  }
  async addStadium(stadium: IStadiumDomainEntity): Promise<StadiumDomainEntity> {
    if (!this.matchAggregateHelper.matchService)
      throw new AggregateRootException('Match service undefined');
    if (!this.matchAggregateHelper.addedStadiumEventPublisher)
      throw new AggregateRootException('Event Publisher undefined');

    const result = await this.matchAggregateHelper.matchService.addStadium(stadium);
    this.matchAggregateHelper.addedStadiumEventPublisher.response = result;
    this.matchAggregateHelper.addedStadiumEventPublisher.publish();
    return result;
  }
  async updateStadiumCapacity(
    capacity: IUpdateStadiumCapacity,
  ): Promise<StadiumDomainEntity> {
    if (!this.matchAggregateHelper.stadiumService)
      throw new AggregateRootException('Stadium service undefined');
    if (!this.matchAggregateHelper.updatedStadiumCapacityEventPublisher)
      throw new AggregateRootException('Event Publisher undefined');

    const result = await this.matchAggregateHelper.stadiumService.updateStadiumCapacity(capacity);
    this.matchAggregateHelper.updatedStadiumCapacityEventPublisher.response = result;
    this.matchAggregateHelper.updatedStadiumCapacityEventPublisher.publish();
    return result;
  }
  async updateStadiumSquareMeters(
    squareMeters: IUpdateStadiumSquareMeters,
  ): Promise<StadiumDomainEntity> {
    if (!this.matchAggregateHelper.stadiumService)
      throw new AggregateRootException('Stadium service undefined');
    if (!this.matchAggregateHelper.updatedStadiumSquareMetersEventPublisher)
      throw new AggregateRootException('Event Publisher undefined');

    const result = await this.matchAggregateHelper.stadiumService.updateStadiumSquareMeters(squareMeters);
    this.matchAggregateHelper.updatedStadiumSquareMetersEventPublisher.response = result;
    this.matchAggregateHelper.updatedStadiumSquareMetersEventPublisher.publish();
    return result;
  }
  async updateRivalTown(
    town: IUpdateRivalTownCommand,
  ): Promise<RivalDomainEntity> {
    if (!this.matchAggregateHelper.rivalService)
      throw new AggregateRootException('Rival service undefined');
    if (!this.matchAggregateHelper.updatedRivalTownEventPublisher)
      throw new AggregateRootException('Event Publisher undefined');

    const result = await this.matchAggregateHelper.rivalService.updateRivalTown(town);
    this.matchAggregateHelper.updatedRivalTownEventPublisher.response = result;
    this.matchAggregateHelper.updatedRivalTownEventPublisher.publish();
    return result;
  }
  async updateDate(date: IUpdateDateCommand): Promise<MatchDomainEntity> {
    if (!this.matchAggregateHelper.matchService)
      throw new AggregateRootException('Match service undefined');
    if (!this.matchAggregateHelper.updatedDateEventPublisher)
      throw new AggregateRootException('Event Publisher undefined');

    const result = await this.matchAggregateHelper.matchService.updateDate(date);
    this.matchAggregateHelper.updatedDateEventPublisher.response = result;
    this.matchAggregateHelper.updatedDateEventPublisher.publish();
    return result;
  }
}
