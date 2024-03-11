import { IsString, IsNotEmpty, IsInt, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsUUID('4')
  artistId: string | null;
  @IsNotEmpty()
  @IsUUID('4')
  albumId: string | null;
  @IsInt()
  duration: number;
}