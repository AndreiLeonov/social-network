import React from "react";

export function withSuspense<wrappedComponentProps>(WrappedComponent: React.ComponentType<wrappedComponentProps>) {
    return (props: wrappedComponentProps) => {
        return <React.Suspense fallback={<div>loading...</div>} >
            <WrappedComponent {...props} />
        </React.Suspense>
    };
}