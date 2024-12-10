import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface PasswordRequirementsProps {
  password: string;
}

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const requirements = [
    {
      label: 'At least 8 characters',
      met: password.length >= 8
    },
    {
      label: 'At least one uppercase letter',
      met: /[A-Z]/.test(password)
    },
    {
      label: 'At least one number',
      met: /\d/.test(password)
    },
    {
      label: 'At least one special character (!@#$%^&*)',
      met: /[!@#$%^&*]/.test(password)
    }
  ];

  const getPasswordStrength = (): { label: string; color: string } => {
    const metCount = requirements.filter(req => req.met).length;
    
    if (metCount === 0) return { label: '', color: '' };
    if (metCount === requirements.length) return { label: 'Strong', color: 'text-green-600' };
    if (metCount >= requirements.length - 1) return { label: 'Good', color: 'text-blue-600' };
    if (metCount >= requirements.length - 2) return { label: 'Fair', color: 'text-yellow-600' };
    return { label: 'Weak', color: 'text-red-600' };
  };

  const strength = getPasswordStrength();

  if (!password) return null;

  return (
    <div className="mt-2 text-sm">
      {strength.label && (
        <p className={`font-medium ${strength.color}`}>
          Password Strength: {strength.label}
        </p>
      )}
      <ul className="mt-2 space-y-1">
        {requirements.map((req, index) => (
          <li
            key={index}
            className={`flex items-center ${
              req.met ? 'text-green-600' : 'text-gray-500'
            }`}
          >
            {req.met ? (
              <CheckIcon className="h-4 w-4 mr-2" />
            ) : (
              <XMarkIcon className="h-4 w-4 mr-2" />
            )}
            {req.label}
          </li>
        ))}
      </ul>
    </div>
  );
}