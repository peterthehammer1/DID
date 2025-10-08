import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { OwnedPhoneNumber, VoiceConfig, SmsConfig } from '@/types/phone-number';
import { Loader2 } from 'lucide-react';

interface NumberConfigDialogProps {
  number: OwnedPhoneNumber | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (numberId: string, config: any) => Promise<void>;
}

interface ConfigForm {
  friendlyName: string;
  voiceEnabled: boolean;
  smsEnabled: boolean;
  forwardToSip: string;
  forwardToWebhook: string;
  voicemailEnabled: boolean;
  smsWebhookUrl: string;
  autoReplyEnabled: boolean;
  autoReplyMessage: string;
}

export function NumberConfigDialog({
  number,
  open,
  onOpenChange,
  onSave,
}: NumberConfigDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm<ConfigForm>({
    defaultValues: {
      friendlyName: number?.friendlyName || '',
      voiceEnabled: number?.voiceEnabled ?? true,
      smsEnabled: number?.smsEnabled ?? true,
      forwardToSip: number?.voiceConfig?.forwardToSip || '',
      forwardToWebhook: number?.voiceConfig?.forwardToWebhook || '',
      voicemailEnabled: number?.voiceConfig?.voicemailEnabled ?? false,
      smsWebhookUrl: number?.smsConfig?.webhookUrl || '',
      autoReplyEnabled: number?.smsConfig?.autoReplyEnabled ?? false,
      autoReplyMessage: number?.smsConfig?.autoReplyMessage || '',
    },
  });

  const voiceEnabled = watch('voiceEnabled');
  const smsEnabled = watch('smsEnabled');
  const autoReplyEnabled = watch('autoReplyEnabled');

  const onSubmit = async (data: ConfigForm) => {
    if (!number) return;

    setIsLoading(true);
    try {
      const voiceConfig: VoiceConfig = {
        forwardToSip: data.forwardToSip,
        forwardToWebhook: data.forwardToWebhook,
        voicemailEnabled: data.voicemailEnabled,
      };

      const smsConfig: SmsConfig = {
        webhookUrl: data.smsWebhookUrl,
        autoReplyEnabled: data.autoReplyEnabled,
        autoReplyMessage: data.autoReplyMessage,
      };

      await onSave(number.id, {
        friendlyName: data.friendlyName,
        voiceEnabled: data.voiceEnabled,
        smsEnabled: data.smsEnabled,
        voiceConfig,
        smsConfig,
      });

      onOpenChange(false);
    } catch (error) {
      console.error('Failed to save configuration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!number) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configure {number.friendlyNumber}</DialogTitle>
          <DialogDescription>
            Set up voice and SMS settings for this phone number
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* General Settings */}
          <div className="space-y-4">
            <h3 className="font-semibold">General Settings</h3>
            <div className="space-y-2">
              <Label htmlFor="friendlyName">Friendly Name</Label>
              <Input
                id="friendlyName"
                placeholder="e.g., Customer Support Line"
                {...register('friendlyName')}
              />
            </div>
          </div>

          {/* Voice Settings */}
          {number.capabilities.voice && (
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Voice Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure how incoming calls are handled
                  </p>
                </div>
                <Switch {...register('voiceEnabled')} />
              </div>

              {voiceEnabled && (
                <div className="space-y-4 pl-4 border-l-2">
                  <div className="space-y-2">
                    <Label htmlFor="forwardToSip">Forward to SIP Endpoint</Label>
                    <Input
                      id="forwardToSip"
                      placeholder="sip:user@domain.com"
                      {...register('forwardToSip')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="forwardToWebhook">Forward to Webhook URL</Label>
                    <Input
                      id="forwardToWebhook"
                      placeholder="https://your-domain.com/voice-webhook"
                      {...register('forwardToWebhook')}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="voicemailEnabled" {...register('voicemailEnabled')} />
                    <Label htmlFor="voicemailEnabled">Enable Voicemail</Label>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SMS Settings */}
          {number.capabilities.sms && (
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">SMS Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Configure how incoming messages are handled
                  </p>
                </div>
                <Switch {...register('smsEnabled')} />
              </div>

              {smsEnabled && (
                <div className="space-y-4 pl-4 border-l-2">
                  <div className="space-y-2">
                    <Label htmlFor="smsWebhookUrl">Webhook URL</Label>
                    <Input
                      id="smsWebhookUrl"
                      placeholder="https://your-domain.com/sms-webhook"
                      {...register('smsWebhookUrl')}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="autoReplyEnabled" {...register('autoReplyEnabled')} />
                    <Label htmlFor="autoReplyEnabled">Enable Auto-Reply</Label>
                  </div>

                  {autoReplyEnabled && (
                    <div className="space-y-2">
                      <Label htmlFor="autoReplyMessage">Auto-Reply Message</Label>
                      <Input
                        id="autoReplyMessage"
                        placeholder="Thank you for your message..."
                        {...register('autoReplyMessage')}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Configuration
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

