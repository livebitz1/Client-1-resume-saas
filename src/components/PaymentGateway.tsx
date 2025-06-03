
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Lock, Shield, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface PaymentGatewayProps {
  amount: number;
  currency: string;
  description: string;
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentError: (error: string) => void;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  amount,
  currency,
  description,
  onPaymentSuccess,
  onPaymentError
}) => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setCardNumber(formatted);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.length <= 5) {
      setExpiryDate(formatted);
    }
  };

  const validateForm = () => {
    if (!cardholderName.trim()) {
      toast.error('Please enter the cardholder name');
      return false;
    }
    if (cardNumber.replace(/\s/g, '').length < 13) {
      toast.error('Please enter a valid card number');
      return false;
    }
    if (expiryDate.length !== 5) {
      toast.error('Please enter a valid expiry date (MM/YY)');
      return false;
    }
    if (cvv.length < 3) {
      toast.error('Please enter a valid CVV');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    
    try {
      // Simulate payment processing with improved UX
      toast.info('Processing your payment...');
      
      // Mock payment processing with realistic timing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockPaymentId = 'payment_' + Date.now();
      
      // Simulate success
      toast.success('Payment processed successfully!');
      onPaymentSuccess(mockPaymentId);
      
      // Redirect to success page after a brief delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error('Payment error:', error);
      onPaymentError('Payment processing failed');
      toast.error('Payment failed. Please check your details and try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayFastPayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    toast.info('Redirecting to PayFast...');
    
    try {
      // Mock PayFast integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, this would redirect to PayFast
      const payFastUrl = `https://sandbox.payfast.co.za/eng/process?merchant_id=10000100&merchant_key=46f0cd694581a&amount=${amount}&item_name=${encodeURIComponent(description)}`;
      
      toast.success('Redirecting to PayFast payment gateway...');
      
      // For demo purposes, simulate successful payment
      setTimeout(() => {
        const mockPaymentId = 'payfast_' + Date.now();
        onPaymentSuccess(mockPaymentId);
        toast.success('Payment completed successfully!');
        navigate('/');
      }, 3000);
      
    } catch (error) {
      console.error('PayFast error:', error);
      onPaymentError('PayFast integration failed');
      toast.error('Failed to connect to PayFast. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border border-gray-200">
      <CardHeader className="text-center bg-gradient-to-r from-teal-50 to-blue-50">
        <CardTitle className="flex items-center justify-center gap-2 text-teal-700">
          <CreditCard className="h-5 w-5" />
          Secure Payment
        </CardTitle>
        <div className="text-3xl font-bold text-teal-600 mt-2">
          {currency} {amount.toFixed(2)}
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </CardHeader>
      
      <CardContent className="space-y-6 p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardholderName" className="text-sm font-medium">
              Cardholder Name
            </Label>
            <Input
              id="cardholderName"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="John Doe"
              disabled={isProcessing}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber" className="text-sm font-medium">
              Card Number
            </Label>
            <Input
              id="cardNumber"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              disabled={isProcessing}
              className="h-11"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate" className="text-sm font-medium">
                Expiry Date
              </Label>
              <Input
                id="expiryDate"
                value={expiryDate}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                maxLength={5}
                disabled={isProcessing}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv" className="text-sm font-medium">
                CVV
              </Label>
              <Input
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                placeholder="123"
                maxLength={3}
                disabled={isProcessing}
                className="h-11"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 p-3 rounded-lg border border-green-200">
          <Shield className="h-4 w-4 text-green-600" />
          <span>Your payment information is encrypted and secure</span>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full h-12 bg-teal-600 hover:bg-teal-700"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Lock className="mr-2 h-4 w-4 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Pay {currency} {amount.toFixed(2)}
              </>
            )}
          </Button>

          <div className="text-center text-sm text-gray-500">or</div>

          <Button 
            onClick={handlePayFastPayment}
            disabled={isProcessing}
            variant="outline"
            className="w-full h-12 border-2"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Lock className="mr-2 h-4 w-4 animate-spin" />
                Connecting to PayFast...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay with PayFast
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-center text-gray-500">
          By proceeding, you agree to our Terms of Service and Privacy Policy
        </p>
      </CardContent>
    </Card>
  );
};

export default PaymentGateway;
