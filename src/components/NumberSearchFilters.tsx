import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SearchFilters, NumberType } from '@/types/phone-number';
import { countries } from '@/lib/countries';

interface NumberSearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading?: boolean;
}

export function NumberSearchFilters({ onSearch, isLoading }: NumberSearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({});

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    setFilters({});
    onSearch({});
  };

  return (
    <div className="bg-card border rounded-lg p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Search Phone Numbers</h2>
        <p className="text-muted-foreground mt-1">
          Find the perfect phone number for your business
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select
            value={filters.country}
            onValueChange={(value) => setFilters({ ...filters, country: value })}
          >
            <SelectTrigger id="country">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  <span className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="areaCode">Area Code</Label>
          <Input
            id="areaCode"
            placeholder="e.g., 415, 212"
            value={filters.areaCode || ''}
            onChange={(e) => setFilters({ ...filters, areaCode: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="e.g., San Francisco"
            value={filters.city || ''}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pattern">Number Pattern</Label>
          <Input
            id="pattern"
            placeholder="e.g., *555*, *00"
            value={filters.pattern || ''}
            onChange={(e) => setFilters({ ...filters, pattern: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="numberType">Number Type</Label>
          <Select
            value={filters.numberType}
            onValueChange={(value) => setFilters({ ...filters, numberType: value as NumberType })}
          >
            <SelectTrigger id="numberType">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">Local</SelectItem>
              <SelectItem value="toll-free">Toll-Free</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleSearch} disabled={isLoading} className="gap-2">
          <Search className="h-4 w-4" />
          Search Numbers
        </Button>
        <Button variant="outline" onClick={handleReset} disabled={isLoading}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
}

