export function getRoleSeverity(role) {
    if (!role)
        return 'secondary';
    switch (role) {
        case 'Admin': return 'contrast';
        case 'Teacher': return 'info';
        default: return 'secondary';
    }
}
export function getRoleLabel(role) {
    if (role === 'Teacher')
        return 'Professor';
    return role || '';
}
