export interface useNotificationProps {}

export const useNotification = ({}: useNotificationProps) => {
    const pop = (text: string) => {
        shopify.toast.show(text);
    };
    return {
        pop,
    };
};
