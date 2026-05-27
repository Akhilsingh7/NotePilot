"use client";

import AuthProvider from "@/context/AuthProvider";

import Providers from "@/redux/providers/provider";
import AppInitializer from "./ AppInitializer";

type Props = {
  children: React.ReactNode;
};

function ClientProviders({ children }: Props) {
  return (
    <Providers>
      <AuthProvider>
        <AppInitializer />

        {children}
      </AuthProvider>
    </Providers>
  );
}

export default ClientProviders;
