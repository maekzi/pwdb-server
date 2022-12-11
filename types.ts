import { KeystoneListsAPI } from '@keystone-6/core/types';
import type { KeystoneListsTypeInfo } from '.keystone/types';

import type { Permission } from './schemas/fields';
export type { Permission } from './schemas/fields';

export type Session = {
    itemId: string;
    listKey: string;
    data: {
      name: string;
      email: string;
      role?: {
        id: string;
        name: string;
      } & {
        [key in Permission]: boolean;
      };
    };
  };
  
  export type ListsAPI = KeystoneListsAPI<KeystoneListsTypeInfo>;
  
  export type AccessArgs = {
    session?: Session;
    item?: any;
  };
  
  export type AccessControl = {
    [key: string]: (args: AccessArgs) => any;
  };
  
  export type ListAccessArgs = {
    itemId?: string;
    session?: Session;
  };