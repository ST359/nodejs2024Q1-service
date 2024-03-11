import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DbService } from 'src/db/db.service';
@Module({
  providers: [TrackService, DbService],
  controllers: [TrackController]
})
export class TrackModule {}
