"use client";

import { NuqsAdapter } from "nuqs/adapters/react";
import type React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import { QueryProvider } from "./query-provider";

function Fallback({
	error,
	resetErrorBoundary,
}: {
	error: Error;
	resetErrorBoundary: () => void;
}) {
	return (
		<div
			role="alert"
			className="flex flex-col items-center justify-center p-8 m-4 bg-red-50 border border-red-200 rounded-lg"
		>
			<h2 className="text-xl font-bold text-red-800 mb-2">
				Something went wrong:
			</h2>
			<pre className="text-sm text-red-600 mb-4 whitespace-pre-wrap">
				{error.message}
			</pre>
			<Button
				onClick={resetErrorBoundary}
				className="bg-red-500 hover:bg-red-600 text-white"
			>
				Try reloading
			</Button>
		</div>
	);
}

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ErrorBoundary
			FallbackComponent={Fallback}
			onReset={() => {
				window.location.reload();
			}}
		>
			<NuqsAdapter>
				<QueryProvider>{children}</QueryProvider>
			</NuqsAdapter>
		</ErrorBoundary>
	);
}
