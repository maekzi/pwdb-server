import nodeTest from 'node:test';
import { Permission, permissionsList } from './schemas/fields';
import { ListAccessArgs } from './types';

/**
 * At it's simplest, the access control returns a yes or no value depending on the users session
 * @param {ListAccessArgs} session
 * @returns {boolean}
 */
export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

/**
 * Creates a permission Object from the Users Sessionme
 */
const generatedPermissions = Object.fromEntries(
  permissionsList.map(permission => [
    permission,
    function ({ session }: ListAccessArgs) {
      return !!session?.data.role?.[permission];
    },
  ])
) as Record<Permission, ({ session }: ListAccessArgs) => boolean>;

/**
 * Permissions check if someone meets a criteria - yes or no.
 */
export const permissions = {
  ...generatedPermissions
};

/**
 * Rule based function
 * Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
 */
export const rules = {
  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    // Otherwise they may only update themselves!
    return { id: { equals: session?.itemId } };
  },
  canManageRoles({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageRoles({ session })) {
      return true;
    }
    return false;
  },
  canManageProjects({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    console.log({session});
    if (permissions.canManageProjects({ session })){
      return true;
    }
    return false;
  },
  canDeleteProjects({ session }: ListAccessArgs) {
    const nowInFive = new Date(Date.now() + 5*60000);
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canDeleteProjects({ session })){
      return true;
    }
    /**
     * Implement abilty to delete the project in a 5 or 10 minute timeframe without credentials
     */
    return false;
  },
  canManageCredentials({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canManageCredentials({ session })){
      return true;
    }
    return false;
  },
  canDeleteCredentials({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    if (permissions.canDeleteCredentials({ session })){
      return true;
    }
    return false;
  },
};