import { UserACL, GroupACL } from "./acl.model";
import { DbCollectionDefinition } from "@uon/db";

export const USER_ACL_COLLECTION: DbCollectionDefinition<UserACL> = {
    name: 'auth_user_acl',
    model: UserACL,
    indices: [
        {
            name: 'user_id_index',
            fields: {
                userId: 1
            }
        },
        {
            name: 'groups_index',
            fields: {
                groupIds: 1
            }
        },
        {
            name: 'resource_index',
            fields: {
                'grants.uri': 1,
                'grants.access': 1,
                'grants.source': 1,
                'grants.sourceId': 1
            },
            sparse: true

        }
    ]
};

export const GROUP_ACL_COLLECTION: DbCollectionDefinition<GroupACL> = {
    name: 'auth_group_acl',
    model: GroupACL,
    indices: [
        {
            name: 'group_name_index',
            fields: {
                name: 1
            }
        },
        {
            name: 'resource_index',
            fields: {
                'grants.uri': 1,
                'grants.access': 1
            }

        }
    ]
};