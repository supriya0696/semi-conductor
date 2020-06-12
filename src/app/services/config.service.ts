import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  public static baseUrl = "http://localhost:4200";
  public static auth={"expiryDuration":1000};

  constructor() { }
}

