import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DbService } from '../db/db.service';
@Module({
  imports: [DbService],
  providers: [FavoritesService, DbService],
  controllers: [FavoritesController]
})
export class FavoritesModule {}
