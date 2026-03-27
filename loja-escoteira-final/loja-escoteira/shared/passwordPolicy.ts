export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_MAX_LENGTH = 120;

export type PasswordRequirement = {
  key: "length" | "uppercase" | "lowercase" | "number" | "special";
  label: string;
  met: boolean;
};

export function evaluatePasswordRequirements(password: string): PasswordRequirement[] {
  const value = String(password ?? "");

  return [
    {
      key: "length",
      label: `Ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres.`,
      met: value.length >= PASSWORD_MIN_LENGTH,
    },
    {
      key: "uppercase",
      label: "Conter ao menos 1 letra maiúscula.",
      met: /[A-Z]/.test(value),
    },
    {
      key: "lowercase",
      label: "Conter ao menos 1 letra minúscula.",
      met: /[a-z]/.test(value),
    },
    {
      key: "number",
      label: "Conter ao menos 1 número.",
      met: /\d/.test(value),
    },
    {
      key: "special",
      label: "Conter ao menos 1 caractere especial.",
      met: /[^A-Za-z0-9]/.test(value),
    },
  ];
}

export function getPasswordPolicyDetails(password: string): string[] {
  return evaluatePasswordRequirements(password)
    .filter(requirement => !requirement.met)
    .map(requirement => `A senha deve ${requirement.label.charAt(0).toLowerCase()}${requirement.label.slice(1)}`);
}

export function isStrongPassword(password: string): boolean {
  return evaluatePasswordRequirements(password).every(requirement => requirement.met);
}
