import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { user } from './user.entity';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'organization_name',
    length: 100,
    unique: true,
    primary: true,
  })
  organizationName!: string;

  @Column('varchar', { name: 'industry', length: 100 })
  industry!: string;

  @Column('varchar', { name: 'organization_size', length: 100 })
  organizationSize?: string;

  @ManyToOne(() => user, { onDelete: 'RESTRICT', nullable: true, eager: true })
  @JoinColumn({ name: 'email', referencedColumnName: 'email' })
  email: user;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt?: Date;
}
