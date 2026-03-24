import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Timestamp } from "typeorm";

export class CreateUserDto {

    @IsNotEmpty() @IsString()
    name:string;

    @IsEmail()
    email:string;

    @IsBoolean()
    isActive:boolean;
    


}
