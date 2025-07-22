import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, CreditCard, Lock, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';


interface PaymentFormProps {
  plan: string | null;
  billingCycle: string;
  onBack: () => void;
  onSuccess?: (planId: string) => void;
}

export default function PaymentForm({ plan, billingCycle, onBack, onSuccess }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simple validation
      if (!cardNumber || !cardName || !expiryMonth || !expiryYear || !cvv) {
        throw new Error('Please fill in all payment details');
      }

      if (cardNumber.replace(/\s/g, '').length !== 16) {
        throw new Error('Please enter a valid 16-digit card number');
      }

      if (cvv.length < 3) {
        throw new Error('Please enter a valid CVV code');
      }

      // In a real app, you would call a payment processing API here
      // For demo purposes, we'll just show a success message
      setSuccess(true);
      setTimeout(() => {
        if (plan) {
          onSuccess?.(plan);
        }
      }, 2000);
    } catch (err: unknown) {
      setError((err as Error).message || 'Payment processing failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPlanDetails = () => {
    switch (plan) {
      case 'basic':
        return {
          name: 'Basic Plan',
          price: billingCycle === 'yearly' ? '$199.99/year' : '$19.99/month',
        };
      case 'pro':
        return {
          name: 'Pro Plan',
          price: billingCycle === 'yearly' ? '$499.99/year' : '$49.99/month',
        };
      case 'ultimate':
        return {
          name: 'Ultimate Plan',
          price: billingCycle === 'yearly' ? '$999.99/year' : '$99.99/month',
        };
      default:
        return {
          name: 'Unknown Plan',
          price: 'Unknown',
        };
    }
  };

  const planDetails = getPlanDetails();

  return (
    <Card className="w-full max-w-md bg-black/40 border-purple-500/30 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white text-2xl">Payment Details</CardTitle>
        <CardDescription className="text-gray-400">
          Subscribe to {planDetails.name} - {planDetails.price}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="space-y-4 text-center">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">Payment Successful!</h3>
            <p className="text-gray-300">
              Thank you for subscribing to {planDetails.name}. Your account has been upgraded.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-900/20 border-red-500/50 text-red-300">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="cardName" className="text-white">
                Name on Card
              </Label>
              <Input
                id="cardName"
                placeholder="John Doe"
                value={cardName}
                onChange={e => setCardName(e.target.value)}
                className="bg-black/20 border-purple-500/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-white">
                Card Number
              </Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="pl-10 bg-black/20 border-purple-500/30 text-white"
                  maxLength={19}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryMonth" className="text-white">
                  Month
                </Label>
                <Select value={expiryMonth} onValueChange={setExpiryMonth}>
                  <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-purple-500/30">
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = (i + 1).toString().padStart(2, '0');
                      return (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryYear" className="text-white">
                  Year
                </Label>
                <Select value={expiryYear} onValueChange={setExpiryYear}>
                  <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                    <SelectValue placeholder="YY" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-purple-500/30">
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = (new Date().getFullYear() + i).toString().slice(-2);
                      return (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv" className="text-white">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="bg-black/20 border-purple-500/30 text-white"
                  maxLength={4}
                />
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-center mb-4 text-sm text-gray-400">
                <Lock className="h-4 w-4 mr-2" />
                Secure payment processing. Your card details are encrypted.
              </div>

              <div className="flex flex-col space-y-2">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Pay ${planDetails.price}`
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-500/30 text-white"
                  onClick={onBack}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Plans
                </Button>
              </div>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
