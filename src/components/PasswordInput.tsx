import {useState} from 'react';
import {Eye, EyeOff} from 'lucide-react';
import {cn} from '@/utils/formater';

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function PasswordInput({className, ...props}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        className={cn(
          'input input-bordered w-full rounded-lg pr-10 text-primary text-base font-normal bg-contras-high',
          className,
        )}
        {...props}
      />
      <button
        type="button"
        className="btn btn-ghost btn-sm text-primary absolute right-0 top-1/2 -translate-y-1/2 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
        tabIndex={-1}>
        {showPassword ? (
          <EyeOff className="h-5 w-5 opacity-50 hover:opacity-100 transition-opacity" />
        ) : (
          <Eye className="h-5 w-5 opacity-50 hover:opacity-100 transition-opacity" />
        )}
        <span className="sr-only">
          {showPassword ? 'Hide password' : 'Show password'}
        </span>
      </button>
    </div>
  );
}
