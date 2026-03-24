import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";


export class CreateTaskDto {
    
    @IsString() @IsNotEmpty()
    title: string;
    
    @IsNotEmpty() @IsString()
    description: string;
    
    @IsBoolean()
    completed: boolean;
    
    @IsNumber()
    userId: number

}
