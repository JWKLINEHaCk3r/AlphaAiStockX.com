'use client';
import React from 'react';

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import SubscriptionPlans from './SubscriptionPlans';
import PaymentForm from './PaymentForm';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: string;
  onSubscribe: (planId: string) => void;
}

export default function SubscriptionModal({
  isOpen,
  onClose,
  currentPlan,
  onSubscribe,
}: SubscriptionModalProps) {
  const [view, setView] = useState('plans'); // plans, payment
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingCycle] = useState('yearly');

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setView('payment');
  };

  const handlePaymentSuccess = (planId: string) => {
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
