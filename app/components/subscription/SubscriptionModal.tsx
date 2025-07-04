'use client';

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import SubscriptionPlans from './SubscriptionPlans';
import PaymentForm from './PaymentForm';

export default function SubscriptionModal({ isOpen, onClose, currentPlan, onSubscribe }) {
  const [view, setView] = useState('plans'); // plans, payment
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('yearly');

  const handleSelectPlan = (planId: any) => {
    setSelectedPlan(planId);
    setView('payment');
  };

  const handlePaymentSuccess = (planId: any) => {
    onSubscribe(planId);
    onClose();
  };

  const handleBack = () => {
    setView('plans');
  };

  const handleClose = () => {
    setView('plans');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl p-6 bg-black/80 border-purple-500/30 backdrop-blur-xl">
        {view === 'plans' ? (
          <SubscriptionPlans currentPlan={currentPlan} onSelectPlan={handleSelectPlan} />
        ) : (
          <div className="flex justify-center">
            <PaymentForm
              plan={selectedPlan}
              billingCycle={billingCycle}
              onBack={handleBack}
              onSuccess={handlePaymentSuccess}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
