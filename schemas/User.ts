import { list } from "@keystone-6/core";
import { password, relationship, text } from "@keystone-6/core/fields";

import type { Lists } from ".keystone/types";

import { permissions, rules } from "../access";

/**
 * Represents a User
 * @constructor
 */
export const User: Lists.User = list({
  access: {
    operation: {
      query: () => true,
      create: () => true,
      update: permissions.canManageUsers,
      delete: permissions.canManageUsers,
    },
    filter: {
      query: rules.canManageUsers,
      update: rules.canManageUsers,
    },
  },
  ui: {
    // Hide the backend UI from regular users
    hideCreate: args => !!permissions.canManageUsers(args),
    hideDelete: args => !permissions.canManageUsers(args),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({ isIndexed: "unique", validation: { isRequired: true } }),
    password: password({ validation: { isRequired: true } }),
    role: relationship({
      ref: 'Role.assignedTo',
      many: false,
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers,
      },
      ui: {
        itemView: {
          fieldMode: ({session}) => permissions.canManageRoles({session}) ? 'edit' : 'hidden',
        },
      }
    }),
  },
});
