import { User } from "./User";
import { Project } from "./Project";
import { Credential } from "./Credential";
import { Role } from './Role';

import type { Lists } from ".keystone/types";

export const lists: Lists = {
  User,
  Project,
  Credential,
  Role
};