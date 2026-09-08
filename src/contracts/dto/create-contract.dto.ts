import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateContractDto {
  @IsNumber()
  employeeId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  contractType: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  status: string;
}
