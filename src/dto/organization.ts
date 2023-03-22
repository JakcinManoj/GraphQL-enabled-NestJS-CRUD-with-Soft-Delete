import { Industry } from "../enum/Industry.enum";
import { OrganizationSize } from "../enum/OrganizationSize.enum";

export type organizationType = {
    organizationName: string;
    industry: Industry;
    organizationSize: OrganizationSize;
    email: string;
}