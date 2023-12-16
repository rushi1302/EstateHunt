import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient()

export async function signIn(formData) {
    const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    const resData = await response.json()
    console.log(resData);
    if (!response.ok) {
        throw new Error(`statusCode ${resData.statusCode} ${resData.message}`)
    }

    return resData;
}