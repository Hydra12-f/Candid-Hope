import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Phone, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const suggestedAmounts = [
  { amount: 500, label: "School supplies for one child" },
  { amount: 1000, label: "Meals for a family" },
  { amount: 2500, label: "Medical support" },
  { amount: 5000, label: "Sponsor education support" },
  { amount: 10000, label: "Fund a workshop" },
  { amount: 25000, label: "Transform a community" },
];

type PaymentState = "form" | "processing" | "success" | "failed";

interface DonationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  causeSlug: string;
  causeTitle: string;
}

const DonationDialog = ({ open, onOpenChange, causeSlug, causeTitle }: DonationDialogProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentState, setPaymentState] = useState<PaymentState>("form");
  const [receipt, setReceipt] = useState<string | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const donationAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  const resetForm = () => {
    setPaymentState("form");
    setReceipt(null);
    setName("");
    setEmail("");
    setPhone("");
    setCustomAmount("");
    setSelectedAmount(1000);
    if (pollingRef.current) clearInterval(pollingRef.current);
  };

  const handleDonate = async () => {
    if (!name || !email || !phone || !donationAmount) {
      toast({ title: "Missing fields", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }

    setPaymentState("processing");

    try {
      const { data, error } = await supabase.functions.invoke("mpesa-stk-push", {
        body: { name, email, phone, amount: donationAmount, cause_slug: causeSlug },
      });

      if (error || !data?.checkout_request_id) {
        throw new Error(data?.error || "Failed to initiate payment");
      }

      const checkoutId = data.checkout_request_id;

      // Poll for status
      let attempts = 0;
      pollingRef.current = setInterval(async () => {
        attempts++;
        if (attempts > 40) {
          // 2 minutes timeout
          clearInterval(pollingRef.current!);
          setPaymentState("failed");
          return;
        }

        try {
          const { data: statusData } = await supabase.functions.invoke("check-donation-status", {
            body: { checkout_request_id: checkoutId },
          });

          if (statusData?.status === "completed") {
            clearInterval(pollingRef.current!);
            setReceipt(statusData.receipt);
            setPaymentState("success");
          } else if (statusData?.status === "failed") {
            clearInterval(pollingRef.current!);
            setPaymentState("failed");
          }
        } catch {
          // Continue polling on error
        }
      }, 3000);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Payment initiation failed";
      toast({ title: "Error", description: message, variant: "destructive" });
      setPaymentState("form");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) resetForm(); onOpenChange(o); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <Heart className="w-5 h-5 text-secondary" />
            Donate to {causeTitle}
          </DialogTitle>
          <DialogDescription>Your donation directly supports this cause via M-Pesa.</DialogDescription>
        </DialogHeader>

        {paymentState === "form" && (
          <div className="space-y-5">
            {/* Suggested amounts */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Select Amount (KES)</Label>
              <div className="grid grid-cols-2 gap-2">
                {suggestedAmounts.map((item) => (
                  <button
                    key={item.amount}
                    onClick={() => { setSelectedAmount(item.amount); setCustomAmount(""); }}
                    className={`p-3 rounded-xl text-left transition-all border ${
                      selectedAmount === item.amount && !customAmount
                        ? "border-secondary bg-secondary/10"
                        : "border-border hover:border-secondary/50"
                    }`}
                  >
                    <span className="font-bold text-foreground">KES {item.amount.toLocaleString()}</span>
                    <span className="block text-xs text-muted-foreground mt-0.5">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="custom-amount">Custom Amount (KES)</Label>
              <Input
                id="custom-amount"
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0); }}
              />
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="donor-name">Full Name</Label>
                <Input id="donor-name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="donor-email">Email</Label>
                <Input id="donor-email" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="donor-phone">M-Pesa Phone Number</Label>
                <Input id="donor-phone" type="tel" placeholder="07XXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>

            <Button
              onClick={handleDonate}
              className="w-full bg-secondary text-secondary-foreground hover:opacity-90 font-semibold rounded-full"
              disabled={!donationAmount || donationAmount < 1}
            >
              Donate KES {donationAmount?.toLocaleString() || "0"} via M-Pesa
            </Button>
          </div>
        )}

        {paymentState === "processing" && (
          <div className="py-10 text-center space-y-4">
            <Phone className="w-12 h-12 text-secondary mx-auto animate-pulse" />
            <h3 className="font-display text-lg font-bold text-foreground">Check your phone</h3>
            <p className="text-muted-foreground text-sm">
              An M-Pesa prompt has been sent to your phone. Enter your PIN to complete the payment.
            </p>
            <Loader2 className="w-6 h-6 animate-spin text-secondary mx-auto" />
            <p className="text-xs text-muted-foreground">Waiting for confirmation...</p>
          </div>
        )}

        {paymentState === "success" && (
          <div className="py-10 text-center space-y-4">
            <CheckCircle2 className="w-14 h-14 text-primary mx-auto" />
            <h3 className="font-display text-lg font-bold text-foreground">Payment Successful!</h3>
            <p className="text-muted-foreground text-sm">
              Thank you for your generous donation of <strong>KES {donationAmount?.toLocaleString()}</strong>.
            </p>
            {receipt && (
              <p className="text-sm text-foreground">
                M-Pesa Receipt: <strong>{receipt}</strong>
              </p>
            )}
            <p className="text-xs text-muted-foreground">A receipt has been sent to your email.</p>
            <Button onClick={() => { resetForm(); onOpenChange(false); }} variant="outline" className="rounded-full">
              Close
            </Button>
          </div>
        )}

        {paymentState === "failed" && (
          <div className="py-10 text-center space-y-4">
            <XCircle className="w-14 h-14 text-destructive mx-auto" />
            <h3 className="font-display text-lg font-bold text-foreground">Payment Failed</h3>
            <p className="text-muted-foreground text-sm">
              The payment was not completed. Please try again.
            </p>
            <Button onClick={resetForm} className="rounded-full bg-secondary text-secondary-foreground">
              Try Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DonationDialog;
