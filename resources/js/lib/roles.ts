/**
 * Utility functions for role-based access control
 */

export type Role = 'admin' | 'operador' | 'vendedor' | 'tecnico';

/**
 * Check if user has a specific role
 */
export function hasRole(userRoles: string[] | undefined, role: Role): boolean {
    if (!userRoles) return false;
    return userRoles.includes(role);
}

/**
 * Check if user has any of the given roles
 */
export function hasAnyRole(userRoles: string[] | undefined, roles: Role[]): boolean {
    if (!userRoles) return false;
    return roles.some(role => userRoles.includes(role));
}

/**
 * Check if user has all of the given roles
 */
export function hasAllRoles(userRoles: string[] | undefined, roles: Role[]): boolean {
    if (!userRoles) return false;
    return roles.every(role => userRoles.includes(role));
}

/**
 * Check if user is admin
 */
export function isAdmin(userRoles: string[] | undefined): boolean {
    return hasRole(userRoles, 'admin');
}

 

/**
 * Check if user can manage customers
 */
export function canManageCustomers(userRoles: string[] | undefined): boolean {
    return hasAnyRole(userRoles, ['admin', 'vendedor', 'operador']);
}

/**
 * Check if user can view technician calendar
 */
export function canViewTechnicianCalendar(userRoles: string[] | undefined): boolean {
    return hasAnyRole(userRoles, ['admin', 'operador', 'tecnico']);
}

/**
 * Check if user can manage staff
 */
export function canManageStaff(userRoles: string[] | undefined): boolean {
    return hasRole(userRoles, 'admin');
}

