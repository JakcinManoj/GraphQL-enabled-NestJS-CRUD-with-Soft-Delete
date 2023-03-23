import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Organization } from './organization.entity';
import { user } from './user.entity';

@Entity()
export class organizationUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => Organization,
    (organization) => organization.organizationName,
    { onDelete: 'CASCADE', nullable: false, eager: true },
  )
  @JoinColumn({
    name: 'organization_name',
    referencedColumnName: 'organizationName',
  })
  organization: Organization;

  @ManyToOne(() => user, (user) => user.email, {
    onDelete: 'CASCADE',
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'user_email', referencedColumnName: 'email' })
  user: user;
}
