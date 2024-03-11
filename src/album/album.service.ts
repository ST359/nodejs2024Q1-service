import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 } from 'uuid';
import { EntityNotFound } from '../errors';
import { DbEntities } from '../db/db.service';
import { DbService } from '../db/db.service';
@Injectable()
export class AlbumService {
  constructor(private db: DbService) {}
  create(createAlbumDto: CreateAlbumDto) {
    const id = v4();
    const { artistId } = createAlbumDto;

    this.db.checkEntityExist(artistId, DbEntities.artists);

    const album = Object.assign({ id }, createAlbumDto);
    this.db.albums.push(album);
    return album;
  }

  findAll() {
    return this.db.albums;
  }

  findOne(id: string) {
    const album = this.db.albums.find((album) => album.id === id);

/*     if (!album) {
      throw new EntityNotFound();
    } */

    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);
    const { artistId } = updateAlbumDto;

    this.db.checkEntityExist(artistId, DbEntities.artists);

    Object.assign(album, updateAlbumDto);

    return album;
  }

  remove(id: string) {
    this.findOne(id);

    this.db.tracks.forEach((track) => {
      if (track.albumId == id) {
        track.albumId = null;
      }
    });

    this.db.favs.albums = this.db.favs.albums.filter(
      (storedId) => storedId !== id,
    );

    this.db.albums = this.db.albums.filter((album) => album.id !== id);
  }
}