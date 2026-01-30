import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ContextData {
  source: string;
  isThreat: string;
  recognizePerson: string;
}

interface ContextFormProps {
  context: ContextData;
  onChange: (context: ContextData) => void;
}

export const ContextForm = ({ context, onChange }: ContextFormProps) => {
  return (
    <div className="glass-card p-6 space-y-6">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <span className="text-primary">3.</span> Add Context
      </h3>

      <div className="space-y-6">
        {/* Source Dropdown */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">
            Where did this content come from?
          </Label>
          <Select
            value={context.source}
            onValueChange={(value) => onChange({ ...context, source: value })}
          >
            <SelectTrigger className="w-full bg-muted/30 border-muted focus:border-primary/50">
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="social_media">Social Media</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="messaging_app">Messaging App</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Threat Question */}
        <div className="space-y-3">
          <Label className="text-sm text-muted-foreground">
            Is this content being used to threaten or blackmail someone?
          </Label>
          <RadioGroup
            value={context.isThreat}
            onValueChange={(value) => onChange({ ...context, isThreat: value })}
            className="flex flex-wrap gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="threat-yes" />
              <Label htmlFor="threat-yes" className="cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="threat-no" />
              <Label htmlFor="threat-no" className="cursor-pointer">No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unsure" id="threat-unsure" />
              <Label htmlFor="threat-unsure" className="cursor-pointer">Unsure</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Recognition Question */}
        <div className="space-y-3">
          <Label className="text-sm text-muted-foreground">
            Do you recognize the person in this content?
          </Label>
          <RadioGroup
            value={context.recognizePerson}
            onValueChange={(value) => onChange({ ...context, recognizePerson: value })}
            className="flex flex-wrap gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="recognize-yes" />
              <Label htmlFor="recognize-yes" className="cursor-pointer">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="recognize-no" />
              <Label htmlFor="recognize-no" className="cursor-pointer">No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="not_applicable" id="recognize-na" />
              <Label htmlFor="recognize-na" className="cursor-pointer">Not Applicable</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};
