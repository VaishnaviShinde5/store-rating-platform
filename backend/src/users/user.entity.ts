import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Rating } from '../ratings/rating.entity';
import { Store } from '../stores/store.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  STORE_OWNER = 'store_owner',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 400 })
  address: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  @OneToMany(() => Store, (store) => store.owner)
  stores: Store[];

  @CreateDateColumn()
  createdAt: Date;
}
