export const validatePassword = (password: string) => {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push("La contraseña debe tener al menos 8 caracteres");
    }
    if (!/[A-Z]/.test(password)) {
        errors.push("Debe contener al menos una letra mayúscula");
    }
    if (!/[a-z]/.test(password)) {
        errors.push("Debe contener al menos una letra minúscula");
    }
    if (!/[0-9]/.test(password)) {
        errors.push("Debe contener al menos un número");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const getPasswordStrength = (password: string): 'weak' | 'medium' | 'strong' => {
    if (!password) return 'weak';

    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score < 3) return 'weak';
    if (score < 5) return 'medium';
    return 'strong';
};
