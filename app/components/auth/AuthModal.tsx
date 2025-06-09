"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import SignInForm from "./SignInForm"
import SignUpForm from "./SignUpForm"
import ForgotPasswordForm from "./ForgotPasswordForm"

export default function AuthModal({ isOpen, onClose, onAuthenticated }) {
  const [view, setView] = useState("signin") // signin, signup, forgot-password

  const handleSignIn = (userData) => {
    onAuthenticated(userData)
    onClose()
  }

  const handleSignUp = (userData) => {
    // In a real app, you might want to show a different view after signup
    // For this demo, we'll just authenticate the user immediately
    onAuthenticated(userData)
    onClose()
  }

  const renderForm = () => {
    switch (view) {
      case "signin":
        return (
          <SignInForm
            onSignIn={handleSignIn}
            onSwitchToSignUp={() => setView("signup")}
            onForgotPassword={() => setView("forgot-password")}
          />
        )
      case "signup":
        return <SignUpForm onSignUp={handleSignUp} onSwitchToSignIn={() => setView("signin")} />
      case "forgot-password":
        return <ForgotPasswordForm onBack={() => setView("signin")} />
      default:
        return <SignInForm onSignIn={handleSignIn} onSwitchToSignUp={() => setView("signup")} />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 bg-transparent border-none">{renderForm()}</DialogContent>
    </Dialog>
  )
}
