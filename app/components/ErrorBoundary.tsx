import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from 'react';
'use client';
import { Card } from "../../components/ui/card";
import { Card, CardHeader, CardContent, CardTitle } from ".../../components/ui/card";

export default function ErrorBoundary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Error Boundary</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Component functionality coming soon.</p>
      </CardContent>
    </Card>
  );
}