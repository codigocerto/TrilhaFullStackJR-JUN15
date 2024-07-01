import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

export function Container({ children }: Props) {
    return (

        <div className="px-5 md:px-5 py-4 max-w-7xl mx-auto w-full">{children}</div>
    ); 
}