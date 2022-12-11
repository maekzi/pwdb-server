// ToDO: Find better alternatives for loading dotenv/config in dev
import 'dotenv/config';
import { config } from '@keystone-6/core';
import { createAuth } from '@keystone-6/auth';

import { lists } from './schemas';
import { session } from './session';
import { permissionsList, adminPermissionsList } from './schemas/fields';

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    itemData: {
      role: {
        create: {
          name: 'Admin',
          ...adminPermissionsList,
        }
      }
    }
  },
  sessionData: `id name email role { ${permissionsList.join(' ')} }`,
});

export default withAuth(
  config({
    db: {
      provider: 'sqlite', //ToDo: Change Provider if you do not use sqlLite
      url: process.env.DATABASE_URL || 'file:./keystone-example.db',
    },
    server: {
      port: 8888,
      cors: {
        origin: [process.env.FRONTEND_URL!],
        credentials: true,
      },
    },
    ui: {
      isAccessAllowed: ({ session }) => !!session,
    },
    lists,
    session,
  })
);