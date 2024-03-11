import { Injectable } from '@nestjs/common';
import { Album } from '../album/interfaces/album.interface';
import { Artist } from '../artist/interfaces/artist.interface';
import { Track } from '../track/interfaces/track.interface';
import { UserEntity } from '../user/entity/user.entity';
import { Favorites } from '../favorites/interfaces/favorites.interface';
import { EntityNotFound } from '../errors';

export const enum DBEntities {
  users = 'users',
  tracks = 'tracks',
  artists = 'artists',
  albums = 'albums',
}

@Injectable()
export class DBService {
  users: UserEntity[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  favs: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  checkEntityExist(id, entityType: DBEntities) {
    if (id) {
      const repository: (UserEntity | Track | Artist | Album)[] =
        this[entityType];
      const entity = repository.find((entity) => entity.id === id);

      if (!entity) {
        throw new EntityNotFound();
      }
    }

    return true;
  }
}