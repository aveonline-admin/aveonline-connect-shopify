export const WEBHOOK_URL = "https://franciscoblanco.vercel.app/api/cache?id=";

export const ListWebhooks = [
    "products/create",
    "products/update",
    "products/delete",
    "orders/create",
    "orders/updated",
    "orders/cancelled",
    "orders/fulfilled",
    "orders/paid",
    "orders/delete",
    "app/uninstalled",
] as const;
export type WebhookTopics = (typeof ListWebhooks)[number];

export interface onAddWebhookProps {
    token: string;
    topic: WebhookTopics;
    shop: string;
}

export const onAddWebhook = async ({
    token,
    topic,
    shop,
}: onAddWebhookProps) => {
    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("X-Shopify-Access-Token", token);
        const raw = JSON.stringify({
            webhook: {
                topic: topic,
                address: `${WEBHOOK_URL}${topic}`,
                format: "json",
            },
        });
        const respond = await fetch(
            `https://${shop}/admin/api/2025-01/webhooks.json`,
            {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            },
        );
        const result = await respond.json();
        return {
            success: true,
            message: "Webhook creado correctamente",
            data: result,
        };
    } catch (error) {
        return {
            success: false,
            message: (error as Error).message,
            error,
        };
    }
};

export const onAddAllWebhooks = async ({
    token,
    shop,
}: Omit<onAddWebhookProps, "topic">) => {
    // use promise all to add all webhooks
    const results = await Promise.all(
        ListWebhooks.map((topic) => onAddWebhook({ token, topic, shop })),
    );
    return results;
};
