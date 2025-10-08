import { useState } from 'react';
import { Settings, Trash2, Phone, MessageSquare, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { OwnedPhoneNumber } from '@/types/phone-number';
import { formatCurrency } from '@/lib/utils';

interface OwnedNumbersDashboardProps {
  numbers: OwnedPhoneNumber[];
  onConfigure: (number: OwnedPhoneNumber) => void;
  onRelease: (numberId: string) => void;
  isLoading?: boolean;
}

export function OwnedNumbersDashboard({
  numbers,
  onConfigure,
  onRelease,
  isLoading,
}: OwnedNumbersDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNumbers = numbers.filter((number) =>
    number.friendlyNumber.includes(searchQuery) ||
    number.friendlyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    number.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Phone Numbers</h2>
          <p className="text-muted-foreground">
            Manage your active phone numbers and their configurations
          </p>
        </div>
      </div>

      {numbers.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by number, name, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      {filteredNumbers.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Phone className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold mb-2">No phone numbers yet</p>
            <p className="text-muted-foreground text-center mb-4">
              Search and purchase your first phone number to get started
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredNumbers.map((number) => (
            <Card key={number.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="font-mono text-xl">
                      {number.friendlyNumber}
                    </CardTitle>
                    {number.friendlyName && (
                      <CardDescription className="text-base mt-1">
                        {number.friendlyName}
                      </CardDescription>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">
                      {number.city}, {number.region}, {number.country}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline">{number.numberType}</Badge>
                    <p className="text-sm font-semibold">
                      {formatCurrency(number.monthlyPrice, number.currency)}/mo
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {number.capabilities.voice && (
                      <Badge
                        variant={number.voiceEnabled ? 'default' : 'secondary'}
                        className="gap-1"
                      >
                        <Phone className="h-3 w-3" />
                        Voice {!number.voiceEnabled && '(Disabled)'}
                      </Badge>
                    )}
                    {number.capabilities.sms && (
                      <Badge
                        variant={number.smsEnabled ? 'default' : 'secondary'}
                        className="gap-1"
                      >
                        <MessageSquare className="h-3 w-3" />
                        SMS {!number.smsEnabled && '(Disabled)'}
                      </Badge>
                    )}
                    {number.voiceConfig?.forwardToSip && (
                      <Badge variant="outline">SIP Configured</Badge>
                    )}
                    {number.smsConfig?.webhookUrl && (
                      <Badge variant="outline">SMS Webhook</Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onConfigure(number)}
                      className="gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      Configure
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to release ${number.friendlyNumber}? This action cannot be undone.`
                          )
                        ) {
                          onRelease(number.id);
                        }
                      }}
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Release
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

