import { InjectionToken } from "@uon/core";
import { RouteGuard } from "@uon/router";
import { DbContext } from "@uon/db";


export const ACL_MODULE_CONFIG = new InjectionToken<AclModuleConfig>("ACL_MODULE_CONFIG");


export interface AclModuleConfig {


    /**
     * Base path for the acl router
     */
    aclPath?: string;

    /**
     * Guards for the acl router
     */
    guards?: RouteGuard[];

 
    /**
     * The db connection (declared with @uon/db/DbModule.WithConfig)
     */
    dbConnectionName: string;

    /**
     * The db name of the mongo database
     */
    dbName: string;

}

export const ACL_CONFIG_DEFAULTS = {
    aclPath: '/acl/v0'
};

export class AclDb extends DbContext {}