import { PhoneNumberCard } from './PhoneNumberCard';
import { PhoneNumber } from '@/types/phone-number';
import { Loader2, Phone } from 'lucide-react';

interface NumberSearchResultsProps {
  numbers: PhoneNumber[];
  onSelectNumber: (number: PhoneNumber) => void;
  isLoading?: boolean;
}

export function NumberSearchResults({
  numbers,
  onSelectNumber,
  isLoading,
}: NumberSearchResultsProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (numbers.length === 0) {
    return (
      <div className="text-center py-12 bg-card border rounded-lg">
        <Phone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg font-semibold mb-2">No phone numbers found</p>
        <p className="text-muted-foreground mb-4">
          Try adjusting your search filters or contact support for more options.
        </p>
        <div className="text-sm text-muted-foreground">
          <p>Test DID available: <span className="font-mono font-semibold">778-244-0105</span></p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">
          Found {numbers.length} available number{numbers.length !== 1 ? 's' : ''}
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {numbers.map((number) => (
          <PhoneNumberCard
            key={number.id}
            number={number}
            onSelect={onSelectNumber}
          />
        ))}
      </div>
    </div>
  );
}

