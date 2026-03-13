import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const PAYPAL_CLIENT_ID = "AY2_HtR06rr6gAGkG6_Wz48W66eiqBOWsmeGB0Z0VxAkJRCSmHoFDd8IwbJMk35jKxWH88wXEqcnmnn_";

const suggestedAmounts = [
  { amount: 5, label: "School supplies for one child" },
  { amount: 10, label: "Meals for a family" },
  { amount: 25, label: "Medical support" },
  { amount: 50, label: "Sponsor education support" },
  { amount: 100, label: "Fund a workshop" },
  { amount: 250, label: "Transform a community" },
];

type PaymentState = "form" | "processing" | "success" | "failed";

interface PayPalDonationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  causeSlug: string;
  causeTitle: string;
}

const PayPalDonationDialog = ({ open, onOpenChange, causeSlug, causeTitle }: PayPalDonationDialogProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(10);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentState, setPaymentState] = useState<PaymentState>("form");
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const paypalScriptLoaded = useRef(false);

  const donationAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const resetForm = () => {
    setPaymentState("form");
    setTransactionId(null);
    setName("");
    setEmail("");
    setCustomAmount("");
    setSelectedAmount(10);
  };

  useEffect(() => {
    if (!open || paymentState !== "form") return;

    const loadPayPalScript = () => {
      return new Promise<void>((resolve) => {
        if (document.getElementById("paypal-sdk")) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.id = "paypal-sdk";
        script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD&intent=capture`;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    const renderButtons = async () => {
      await loadPayPalScript();

      // Wait for container to be in DOM
      await new Promise((r) => setTimeout(r, 100));

      const container = paypalContainerRef.current;
      if (!container) return;
      container.innerHTML = "";

      const paypal = (window as any).paypal;
      if (!paypal) return;

      paypal.Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "pill",
          label: "donate",
        },
        createOrder: (_data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                description: `Donation to ${causeTitle}`,
                amount: {
                  value: donationAmount.toFixed(2),
                  currency_code: "USD",
                },
              },
            ],
            application_context: {
              shipping_preference: "NO_SHIPPING",
            },
          });
        },
        onApprove: async (_data: any, actions: any) => {
          setPaymentState("processing");
          try {
            const order = await actions.order.capture();
            setTransactionId(order.id);
            setPaymentState("success");
          } catch {
            setPaymentState("failed");
          }
        },
        onError: () => {
          setPaymentState("failed");
        },
        onCancel: () => {
          // User cancelled, stay on form
        },
      }).render(container);
    };

    renderButtons();
  }, [open, paymentState, donationAmount, causeTitle]);

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) resetForm(); onOpenChange(o); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl flex items-center gap-2">
            <Heart className="w-5 h-5 text-secondary" />
            Donate to {causeTitle}
          </DialogTitle>
          <DialogDescription>Your donation directly supports this cause via PayPal (USD).</DialogDescription>
        </DialogHeader>

        {paymentState === "form" && (
          <div className="space-y-5">
            <div>
              <Label className="text-sm font-medium mb-2 block">Select Amount (USD)</Label>
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
                    <span className="font-bold text-foreground">${item.amount}</span>
                    <span className="block text-xs text-muted-foreground mt-0.5">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="pp-custom-amount">Custom Amount (USD)</Label>
              <Input
                id="pp-custom-amount"
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0); }}
              />
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="pp-donor-name">Full Name</Label>
                <Input id="pp-donor-name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="pp-donor-email">Email</Label>
                <Input id="pp-donor-email" type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>

            <div className="pt-2">
              <p className="text-sm text-muted-foreground mb-3 text-center">
                Donating <strong>${donationAmount?.toFixed(2) || "0.00"}</strong> via PayPal
              </p>
              <div ref={paypalContainerRef} className="min-h-[50px]" />
            </div>
          </div>
        )}

        {paymentState === "processing" && (
          <div className="py-10 text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-secondary mx-auto" />
            <h3 className="font-display text-lg font-bold text-foreground">Processing Payment...</h3>
            <p className="text-muted-foreground text-sm">Please wait while we confirm your PayPal payment.</p>
          </div>
        )}

        {paymentState === "success" && (
          <div className="py-10 text-center space-y-4">
            <CheckCircle2 className="w-14 h-14 text-primary mx-auto" />
            <h3 className="font-display text-lg font-bold text-foreground">Payment Successful!</h3>
            <p className="text-muted-foreground text-sm">
              Thank you for your generous donation of <strong>${donationAmount?.toFixed(2)}</strong>.
            </p>
            {transactionId && (
              <p className="text-sm text-foreground">
                Transaction ID: <strong>{transactionId}</strong>
              </p>
            )}
            <Button onClick={() => { resetForm(); onOpenChange(false); }} variant="outline" className="rounded-full">
              Close
            </Button>
          </div>
        )}

        {paymentState === "failed" && (
          <div className="py-10 text-center space-y-4">
            <XCircle className="w-14 h-14 text-destructive mx-auto" />
            <h3 className="font-display text-lg font-bold text-foreground">Payment Failed</h3>
            <p className="text-muted-foreground text-sm">The payment was not completed. Please try again.</p>
            <Button onClick={resetForm} className="rounded-full bg-secondary text-secondary-foreground">
              Try Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PayPalDonationDialog;
