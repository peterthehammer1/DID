import { Phone, MessageSquare, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { PhoneNumber } from '@/types/phone-number';
import { formatCurrency } from '@/lib/utils';

interface PhoneNumberCardProps {
  number: PhoneNumber;
  onSelect: (number: PhoneNumber) => void;
  isLoading?: boolean;
}

export function PhoneNumberCard({ number, onSelect, isLoading }: PhoneNumberCardProps) {
  const getNumberTypeColor = (type: string) => {
    switch (type) {
      case 'local':
        return 'bg-blue-100 text-blue-800';
      case 'toll-free':
        return 'bg-green-100 text-green-800';
      case 'mobile':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold font-mono">{number.friendlyNumber}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {number.city}, {number.region}, {number.country}
            </p>
          </div>
          <Badge className={getNumberTypeColor(number.numberType)}>
            {number.numberType.replace('-', ' ')}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-2 mb-3">
          {number.capabilities.voice && (
            <Badge variant="outline" className="gap-1">
              <Phone className="h-3 w-3" />
              Voice
            </Badge>
          )}
          {number.capabilities.sms && (
            <Badge variant="outline" className="gap-1">
              <MessageSquare className="h-3 w-3" />
              SMS
            </Badge>
          )}
          {number.capabilities.mms && (
            <Badge variant="outline" className="gap-1">
              <Mail className="h-3 w-3" />
              MMS
            </Badge>
          )}
        </div>
        
        <div className="text-sm">
          <span className="text-muted-foreground">Area Code:</span>
          <span className="font-medium ml-2">{number.areaCode}</span>
        </div>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between pt-3 border-t">
        <div>
          <p className="text-2xl font-bold">{formatCurrency(number.monthlyPrice, number.currency)}</p>
          <p className="text-xs text-muted-foreground">per month</p>
        </div>
        <Button onClick={() => onSelect(number)} disabled={isLoading}>
          Select Number
        </Button>
      </CardFooter>
    </Card>
  );
}

