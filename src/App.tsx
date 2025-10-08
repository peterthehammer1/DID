import { useState } from 'react';
import { QueryClient, QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query';
import { Toaster, toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NumberSearchFilters } from '@/components/NumberSearchFilters';
import { NumberSearchResults } from '@/components/NumberSearchResults';
import { NumberConfigDialog } from '@/components/NumberConfigDialog';
import { OwnedNumbersDashboard } from '@/components/OwnedNumbersDashboard';
import { PhoneNumber, OwnedPhoneNumber, SearchFilters } from '@/types/phone-number';
import { mockPhoneNumberApi as phoneNumberApi } from '@/lib/mock-api';
import { Phone } from 'lucide-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({});
  const [selectedNumber, setSelectedNumber] = useState<OwnedPhoneNumber | null>(null);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('search');

  // Search available numbers
  const {
    data: availableNumbers = [],
    isLoading: isSearching,
    refetch: searchNumbers,
  } = useQuery({
    queryKey: ['numbers', 'search', searchFilters],
    queryFn: () => phoneNumberApi.search(searchFilters),
    enabled: false, // Manual trigger
  });

  // Get owned numbers
  const {
    data: ownedNumbers = [],
    isLoading: isLoadingOwned,
    refetch: refetchOwned,
  } = useQuery({
    queryKey: ['numbers', 'owned'],
    queryFn: phoneNumberApi.getOwned,
  });

  // Purchase number mutation
  const purchaseMutation = useMutation({
    mutationFn: (numberId: string) => phoneNumberApi.purchase(numberId),
    onSuccess: () => {
      toast.success('Phone number purchased successfully!');
      refetchOwned();
      setActiveTab('owned');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to purchase number');
    },
  });

  // Update configuration mutation
  const updateConfigMutation = useMutation({
    mutationFn: ({ numberId, config }: { numberId: string; config: any }) =>
      phoneNumberApi.updateConfig(numberId, config),
    onSuccess: () => {
      toast.success('Configuration updated successfully!');
      refetchOwned();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update configuration');
    },
  });

  // Release number mutation
  const releaseMutation = useMutation({
    mutationFn: (numberId: string) => phoneNumberApi.release(numberId),
    onSuccess: () => {
      toast.success('Phone number released successfully');
      refetchOwned();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to release number');
    },
  });

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
    searchNumbers();
  };

  const handleSelectNumber = (number: PhoneNumber) => {
    if (
      window.confirm(
        `Purchase ${number.friendlyNumber} for ${number.monthlyPrice} ${number.currency}/month?`
      )
    ) {
      purchaseMutation.mutate(number.id);
    }
  };

  const handleConfigureNumber = (number: OwnedPhoneNumber) => {
    setSelectedNumber(number);
    setConfigDialogOpen(true);
  };

  const handleSaveConfig = async (numberId: string, config: any) => {
    await updateConfigMutation.mutateAsync({ numberId, config });
  };

  const handleReleaseNumber = (numberId: string) => {
    releaseMutation.mutate(numberId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" richColors />

      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <img 
              src="/PTlogowhite.png" 
              alt="Port This Logo" 
              className="h-16 w-auto"
            />
            <div>
              <p className="text-sm text-gray-600">
                Search, purchase, and manage your phone numbers
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="search" className="gap-2">
              <Phone className="h-4 w-4" />
              Search Numbers
            </TabsTrigger>
            <TabsTrigger value="owned" className="gap-2">
              <Phone className="h-4 w-4" />
              My Numbers ({ownedNumbers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-8">
            <NumberSearchFilters onSearch={handleSearch} isLoading={isSearching} />
            <NumberSearchResults
              numbers={availableNumbers}
              onSelectNumber={handleSelectNumber}
              isLoading={isSearching}
            />
          </TabsContent>

          <TabsContent value="owned">
            <OwnedNumbersDashboard
              numbers={ownedNumbers}
              onConfigure={handleConfigureNumber}
              onRelease={handleReleaseNumber}
              isLoading={isLoadingOwned}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Configuration Dialog */}
      <NumberConfigDialog
        number={selectedNumber}
        open={configDialogOpen}
        onOpenChange={setConfigDialogOpen}
        onSave={handleSaveConfig}
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;

