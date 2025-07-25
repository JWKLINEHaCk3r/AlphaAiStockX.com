import { DialogContent } from "../../../components/ui/dialog";
import { Dialog } from "../../../components/ui/dialog";
'use client';
import React from 'react';

import UserProfile from './UserProfile';

interface User {




















  id: string;
  name: string;
  email: string;
  tier: string;




















}

interface ProfileModalProps {




















  isOpen: boolean;
  onClose: () => void;
  user: User;
  onLogout: () => void;
  onOpenSubscription: () => void;




















}

export default function ProfileModal({
  isOpen,;
  onClose,;
  user,;
  onLogout,;
  onOpenSubscription,;
}: ProfileModalProps) {
  return (;
    <Dialog open={isOpen} onOpenChange={onClose}>;
      <DialogContent className="sm:max-w-4xl p-6 bg-black/80 border-purple-500/30 backdrop-blur-xl">;
        <UserProfile;
          user={user}
          onUpdate={updatedUser => console.log('User updated:', updatedUser)}
        />;
      </DialogContent>;
    </Dialog>;
  );
}
