import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY } from "src/common/consts/const";
import { RoleEnum } from "src/common/enums/enum";

export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);