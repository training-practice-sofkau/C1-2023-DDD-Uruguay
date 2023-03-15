import { IsBoolean, IsString } from 'class-validator';
import { IModificarStateContratoCommands } from '../../../../../domain/interfaces/commands/contrato/modificar-state.commands.interface';

export class ModificarStateContrato implements IModificarStateContratoCommands {
    @IsString()
    id: string;
    
    @IsBoolean()
    state: boolean;
   
}