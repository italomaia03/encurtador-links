type URLModelProps = {
  id?: number;
  longUrl: string;
  shortUrl: string;
  urlCode: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class URLModel {
    private _id?: number;
    private _longUrl: string;
    private _shortUrl: string;
    private _urlCode: string;
    private _createdAt?: Date;
    private _updatedAt?: Date;

  constructor(props: URLModelProps) {
    const { id, longUrl, shortUrl, urlCode, createdAt, updatedAt } = props;
    this._id = id;
    this._longUrl = longUrl;
    this._shortUrl = shortUrl;
    this._urlCode = urlCode;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id(): number | undefined {
    return this._id;
  }
  get longUrl(): string {
    return this._longUrl;
  }
  get shortUrl(): string {
    return this._shortUrl;
  }
  get urlCode(): string {
    return this._urlCode;
  }
  get createdAt(): Date | undefined {
    return this._createdAt;
  }
  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }
  set id(value: number) {
    this._id = value;
  }
  set url(value: string) {
    this._longUrl = value;
  }
  set shortUrl(value: string) {
    this._shortUrl = value;
  }
  set urlCode(value: string) {
    this._urlCode = value;
  }
  set createdAt(value: Date) {
    this._createdAt = value;
  }
  set updatedAt(value: Date) {
    this._updatedAt = value;
  }
}