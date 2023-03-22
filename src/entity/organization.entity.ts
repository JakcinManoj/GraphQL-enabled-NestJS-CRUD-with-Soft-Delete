import { Entity, Column, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { OrganizationUser } from "./organization-user.entity";

@Entity()
export class Organization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { name:'organization_name', length: 100, unique: true })
    organizationName!: string;

    @Column('varchar', { name:'industry', length: 100, })
    industry!: string;

    @Column('varchar', { name:'organization_size', length: 100, })
    organizationSize?: string;

    @ManyToOne(() => OrganizationUser,{ onDelete: 'RESTRICT', nullable: true, eager: true })
    @JoinColumn({ name: 'email', referencedColumnName: 'email' })
    email: OrganizationUser;

    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
    deletedAt?: Date; 
}