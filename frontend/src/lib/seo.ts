import type { Metadata } from "next";

export const generateSEO = ({
    title,
    description,
    image,
    url,
}: {
    title: string;
    description: string;
    image?: string;
    url?: string;
}): Metadata => {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            images: image ? [{ url: image }] : [],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: image ? [image] : [],
        },
    };
};