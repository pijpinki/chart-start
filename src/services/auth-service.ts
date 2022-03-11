import { Injectable } from '@nestjs/common';
import config from '../config';

interface Input {
  key: string;
}

Injectable()
export class AuthService {
  auth(input: Input): void {
    const { key } = input;

    if (key !== config.root.password) {
      throw new Error('Auth failed');
    }
  }
}
