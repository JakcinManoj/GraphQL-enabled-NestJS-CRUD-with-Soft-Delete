import { Entity, Column, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn } from "typeorm";
import { OrganizationUser } from "./organization-user.entity";

@Entity()
export class Organization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { name:'organization_name', length: 100, })
    organizationName!: string;

    @Column('varchar', { name:'industry', length: 100, })
    industry!: string

    @Column('varchar', { name:'organization_size', length: 100, })
    organizationSize?: string;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
    deletedAt?: Date;

    @OneToMany(() => OrganizationUser, 
    organizationUser => organizationUser.id)
    organizationUser: OrganizationUser[];
  
}