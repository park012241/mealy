import {Injectable} from '@nestjs/common';
import {Collection, DbCollectionOptions, GridFSBucket, MongoClient} from 'mongodb';

@Injectable()
export class DatabaseService extends MongoClient {
  private collections: Record<string, Collection>;

  constructor(connectionURI: string) {
    super(connectionURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  public async connect(): Promise<DatabaseService> {
    await super.connect();
    return this;
  }

  public collection<T = any>(name: string, option?: DbCollectionOptions): Collection<T> {
    if (!this.collections[name]) {
      this.collections[name] = this.db().collection(name, option);
    }

    return this.collections[name] as Collection<T>;
  }

  public gridFS(name: string): GridFSBucket {
    return new GridFSBucket(this.db(), {
      bucketName: name,
      chunkSizeBytes: 4096,
    });
  }
}
