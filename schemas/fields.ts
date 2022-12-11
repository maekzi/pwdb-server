import { checkbox } from "@keystone-6/core/fields";

export const permissionFields = {
  canSeeOtherUsers: checkbox({
    defaultValue: false,
    label: "User can query other users",
  }),
  canManageUsers: checkbox({
    defaultValue: false,
    label: "User can Edit other users",
  }),
  canManageRoles: checkbox({
    defaultValue: false,
    label: "User can CRUD roles",
  }),
  canManageProjects: checkbox({
    defaultValue: false,
    label: "User can create and update any project",
  }),
  canDeleteProjects: checkbox({
    defaultValue: false,
    label: "User can delete any project",
  }),
  canManageCredentials: checkbox({
    defaultValue: false,
    label: "User can create and update any credentials"
  }),
  canDeleteCredentials: checkbox({
    defaultValue: false,
    label: "User can delete any project"
  })
};

export type Permission = keyof typeof permissionFields;

export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];

export const adminPermissionsList = permissionsList.reduce((accumulator, value) => {
  return {...accumulator, [value]: true};
}, {});