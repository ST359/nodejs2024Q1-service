import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { FavoritesModule } from './favorites/favorites.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AlbumModule, UserModule, ArtistModule, TrackModule, FavoritesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
