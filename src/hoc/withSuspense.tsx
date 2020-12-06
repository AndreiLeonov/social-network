import React from "react";

export const withSuspense = (Component: any) => {
    return (props: any) => {
        return (
            <React.Suspense fallback={<h1>Loading profile...</h1>}>
                <Component {...props} />
            </React.Suspense>);
    }
}
