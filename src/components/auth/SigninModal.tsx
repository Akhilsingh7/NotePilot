"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SigninModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold">
            Welcome back
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-500">
            Sign in to continue to your dashboard.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label>Email</Label>
            <Input type="text" placeholder="Enter your email" />
          </div>

          <div>
            <Label>Password</Label>
            <Input type="password" placeholder="Enter password" />
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Checkbox />
            <span>Remember me</span>
          </div>

          <Button className="w-full">Sign in</Button>

          <p className="text-center text-sm text-gray-500">
            No account? Create one
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
