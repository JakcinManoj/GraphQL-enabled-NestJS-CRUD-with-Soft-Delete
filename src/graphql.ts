
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum OrganizationSize {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE"
}

export enum Industry {
    HEALTHCARE = "HEALTHCARE",
    AGRICULTURE = "AGRICULTURE",
    AUTOMOBILE = "AUTOMOBILE",
    BANKING = "BANKING",
    CONSTRUCTION = "CONSTRUCTION",
    EDUCATION = "EDUCATION"
}

export interface OrganizationInput {
    organizationName?: Nullable<string>;
    industry?: Nullable<Industry>;
    organizationSize?: Nullable<OrganizationSize>;
}

export interface OrganizationUserInput {
    FirstName: string;
    LastName: string;
    Email: string;
    Phone?: Nullable<string>;
}

export interface Organization {
    organizationName?: Nullable<string>;
    industry?: Nullable<Industry>;
    organizationSize?: Nullable<OrganizationSize>;
}

export interface IQuery {
    getOrganizations(): Nullable<Nullable<Organization>[]> | Promise<Nullable<Nullable<Organization>[]>>;
    getOrganizationByName(organizationName?: Nullable<string>): Nullable<Organization> | Promise<Nullable<Organization>>;
}

export interface IMutation {
    createOrganization(input?: Nullable<OrganizationInput>): Nullable<Organization> | Promise<Nullable<Organization>>;
    updateOrganization(input?: Nullable<OrganizationInput>): Nullable<string> | Promise<Nullable<string>>;
    deleteOrganization(input?: Nullable<OrganizationInput>): Nullable<string> | Promise<Nullable<string>>;
    softDeleteOrganization(input?: Nullable<OrganizationInput>): Nullable<string> | Promise<Nullable<string>>;
    restoreOrganization(input?: Nullable<OrganizationInput>): Nullable<string> | Promise<Nullable<string>>;
}

type Nullable<T> = T | null;
