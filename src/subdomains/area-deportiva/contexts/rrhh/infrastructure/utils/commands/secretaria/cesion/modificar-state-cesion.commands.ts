import { IsBoolean,IsUUID } from 'class-validator';
import { IModificarStateCesionCommands } from '../../../../../domain/interfaces/commands/cesion/modificar-state.commands.interface';

export class ModificarStateContrato implements IModificarStateCesionCommands {

    @IsUUID()
    cesionid: string;
    
    @IsBoolean()
    state: boolean;
   
}