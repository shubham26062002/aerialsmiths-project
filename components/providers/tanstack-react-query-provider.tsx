import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

type TanstackReactQueryProviderProps = {
    children: React.ReactNode,
}

export const TanstackReactQueryProvider = ({
    children,
}: TanstackReactQueryProviderProps) => {
    const client = new QueryClient()

    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    )
}