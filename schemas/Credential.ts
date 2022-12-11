import { list } from "@keystone-6/core";
import { text, relationship, select, timestamp } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

import type { Lists } from ".keystone/types";

import { isSignedIn, permissions, rules } from "../access";

/**
 * Represents one Credential
 * @constructor
 */
export const Credential: Lists.Credential = list({
  access: {
    operation: {
      query: isSignedIn,
      update: permissions.canDeleteCredentials,
      create: permissions.canManageCredentials,
      delete: permissions.canDeleteCredentials,
    },
    filter: {
      update: rules.canManageCredentials,
      delete: rules.canDeleteCredentials,
    },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    type: select({
      type: "enum",
      options: [
        { label: "Frontend", value: "fe" },
        { label: "Backend", value: "be" },
        { label: "FTP", value: "ftp" },
        { label: "SSH", value: "ssh" },
        { label: "Other", value: "other" },
      ],
      validation: {
        isRequired: true,
      },
    }),
    enviroment: select({
      type: "enum",
      options: [
        { label: "Development", value: "develop" },
        { label: "Stage", value: "stage" },
        { label: "Live", value: "live" },
        { label: "Other", value: "other" },
      ],
      validation: {
        isRequired: true,
      },
    }),
    user: text({ validation: { isRequired: true } }),
    password: text({ validation: { isRequired: true } }),
    url: text(),
    info: document({
      relationships: {
        link: {
          label: "Access",
          listKey: "Credential",
        },
      },
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      links: true,
      dividers: true,
    }),
    assignedTo: relationship({
      access: {
        read: () => true,
        create: () => true,
        update: () => true,
      },
      ref: "Project.credentials",
      many: false,
    }),
    lastUpdated_by: relationship({
      access: {
        read: () => true,
        create: () => false,
        update: () => false,
      },
      ref: "User",
      many: false,
      ui: {
        hideCreate: true,
        removeMode: "none",
        itemView: {
            fieldMode: "read",
          },
      },
      hooks: {
        resolveInput: async ({ resolvedData, operation, context }) => {
          if (operation === "create" || operation === "update") {
            const user = await context.query.User.findOne({
              where: {
                email: context.session.data.email,
              },
            });
            resolvedData.lastUpdated_by = {
              connect: { id: user.id },
            };
          }
          return resolvedData["lastUpdated_by"];
        },
      },
    }),
    lastUpdated_at: timestamp({
      access: {
        read: () => true,
        create: () => false,
        update: () => false,
      },
      isIndexed: true,
      db: {
        isNullable: false,
        updatedAt: true,
      },
      defaultValue: { kind: "now" },
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
    }),
    created_by: relationship({
      access: {
        read: () => true,
        create: () => false,
        update: () => false,
      },
      ref: "User",
      many: false,
      ui: {
        hideCreate: true,
        removeMode: "none",
        itemView: {
          fieldMode: "read",
        },
      },
      hooks: {
        resolveInput: async ({ resolvedData, operation, context }) => {
          if (operation === "create") {
            const user = await context.query.User.findOne({
              where: {
                email: context.session.data.email,
              },
            });
            resolvedData.lastUpdated_by = {
              connect: { id: user.id },
            };
          }
          return resolvedData["created_by"];
        },
      },
    }),
    created_at: timestamp({
      access: {
        read: () => true,
        create: () => false,
        update: () => false,
      },
      isIndexed: false,
      db: {
        isNullable: false,
      },
      defaultValue: { kind: "now" },
      ui: {
        itemView: {
          fieldMode: "read",
        },
      },
    }),
  },
});
