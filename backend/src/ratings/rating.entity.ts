import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, Unique, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Store } from '../stores/store.entity';

@Entity('ratings')
@Unique(['user', 'store'])
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  value: number;

  @ManyToOne(() => User, (user) => user.ratings, { eager: true })
  user: User;

  @ManyToOne(() => Store, (store) => store.ratings)
  store: Store;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
