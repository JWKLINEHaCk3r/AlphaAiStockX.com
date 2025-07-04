'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import UserProfile from './UserProfile';

export default function ProfileModal({ isOpen, onClose, user, onLogout, onOpenSubscription }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl p-6 bg-black/80 border-purple-500/30 backdrop-blur-xl">
        <UserProfile user={user} onLogout={onLogout} onOpenSubscription={onOpenSubscription} />
      </DialogContent>
    </Dialog>
  );
}
