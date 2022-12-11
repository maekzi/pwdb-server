import { list } from "@keystone-6/core";
import { text, relationship, timestamp } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

import type { Lists } from ".keystone/types";

import { isSignedIn, permissions, rules } from "../access";
import { URLREGEX } from '../utils/constants';

/**
 * Represents a Project
 * @constructor
 */
export const Project: Lists.Project = list({
  access: {
    operation: {
      query: isSignedIn,
      create: permissions.canManageProjects,
      update: permissions.canManageProjects,
      delete: permissions.canDeleteProjects,
    },
    filter: {
      query: isSignedIn,
      update: rules.canManageProjects,
      delete: rules.canDeleteProjects,
    },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    desciption: document({
      relationships: {
        mention: {
          label: "Mention",
          listKey: "User",
        },
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
    jiraLink: text(
      {
        validation: {
          match: {
            regex: URLREGEX,
            explanation: `has to be a valid URL`
          }
        }
      }
    ),
    gitlabLink: text(
      {
        validation: {
          match: {
            regex: URLREGEX,
            explanation: `has to be a valid URL`
          }
        }
      }
    ),
    confluenceLink: text(
      {
        validation: {
          match: {
            regex: URLREGEX,
            explanation: `has to be a valid URL`
          }
        }
      }
    ),
    credentials: relationship({
       ref: "Credential.assignedTo",
       many: true,
       access: {
        create: permissions.canManageProjects,
        update: permissions.canManageProjects,
      },
      ui: {
        itemView: {
          fieldMode: ({session}) => permissions.canManageCredentials({session}) ? 'edit' : 'hidden',
        },
        displayMode: 'cards',
        cardFields: ['name', 'type', 'enviroment']
      }
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
          fieldMode: 'read',
        }
      },
      hooks: {
        resolveInput: async ({ resolvedData, operation, context }) => {
          if (operation === "create") {
            const user = await context.query.User.findOne({
              where: {
                email: context.session.data.email,
              },
            });
            resolvedData.created_by = {
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
          fieldMode: 'read',
        }
      }
    }),
  },
});
