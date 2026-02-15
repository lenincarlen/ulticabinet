export const validatePassword = (password: string) => {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push('La contraseña debe tener al menos 8 caracteres');
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('La contraseña debe contener al menos una mayúscula');
    }

    if (!/[a-z]/.test(password)) {
        errors.push('La contraseña debe contener al menos una minúscula');
    }

    if (!/[0-9]/.test(password)) {
        errors.push('La contraseña debe contener al menos un número');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const getPasswordStrength = (password: string) => {
    if (!password) return 'none';

    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return 'weak';
    if (score <= 4) return 'medium';
    return 'strong';
};
