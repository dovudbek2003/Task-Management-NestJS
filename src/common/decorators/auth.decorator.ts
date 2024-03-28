import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { RoleEnum } from "../enums/enum";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { RolesGuard } from "src/modules/auth/guards/role.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ROLES_KEY } from "../consts/const";

export function Auth(...roles: RoleEnum[]) {
    return applyDecorators(
        ApiBearerAuth(),
        UseGuards(AuthGuard, RolesGuard),
        SetMetadata(ROLES_KEY, roles)
    );
}