import { EntityAbstract } from '@app/common';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class UserEntity extends EntityAbstract {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  toJSON() {
    const obj = { ...this };
    delete obj.password;

    return obj;
  }
}
