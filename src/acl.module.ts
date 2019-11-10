import {
    Module,
    ModuleWithProviders,
    Inject,
    Optional,
    Injector
} from '@uon/core';
import { Router } from '@uon/router';
import { HttpRoute, HTTP_ROUTER } from '@uon/http';
import { DbService } from '@uon/db';
import { USER_ACL_COLLECTION, GROUP_ACL_COLLECTION } from './collections';
import { AclModuleConfig, ACL_CONFIG_DEFAULTS, ACL_MODULE_CONFIG, AclDb } from './config';


@Module({
    imports: [],
    providers: []
})
export class AclModule {


    constructor(@Optional() @Inject('ACL_API_ROUTES') _routes: any,
        @Optional() @Inject(HTTP_ROUTER) _router: any) {

        if (!_routes) {
            throw new Error('AclModule needs to be imported using AclModule.WithConfig()');
        }
    }

    static WithConfig(config: AclModuleConfig): ModuleWithProviders<AclModule> {


        const merged_config = Object.assign({}, ACL_CONFIG_DEFAULTS, config);


        return {
            module: AclModule,
            providers: [

                {
                    token: ACL_MODULE_CONFIG,
                    value: Object.freeze(merged_config)
                },

                /**
         * Auth DB context
         */
                {
                    token: AclDb,
                    factory: (db: DbService) => {

                        return db.createContext(
                            config.dbConnectionName,
                            config.dbName,
                            [
                                USER_ACL_COLLECTION,
                                GROUP_ACL_COLLECTION
                            ], []);

                    },
                    deps: [DbService]
                },

                /**
                 * Provides acl routes to http router 
                 */
                {
                    token: 'ACL_API_ROUTES',
                    factory: (injector: Injector) => {

                      /*  const router: Router<HttpRoute> =
                            injector.get(HTTP_ROUTER, null);

                        if (router) {
                            router.add({
                                path: merged_config.aclPath,
                                guards: merged_config.guards || [],
                                children: [
                                    {
                                        path: '/group',
                                        outlet: GroupOutlet,
                                        guards
                                    },
                                    {
                                        path: '/user',
                                        outlet: UserOutlet,
                                        guards
                                    }

                                ]
                            });
                        }*/

                        return true;
                    },
                    deps: [Injector]
                }

            ]
        };
    }
}

