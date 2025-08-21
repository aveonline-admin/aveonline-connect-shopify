import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { AdminApiContextWithoutRest } from "node_modules/@shopify/shopify-app-remix/dist/ts/server/clients";
import { authenticate } from "../../shopify.server";
import { json } from "@remix-run/node";


export interface onGetDataProps {
    admin: AdminApiContextWithoutRest
    settings: Record<string, string>
}

export interface onSaveDataProps extends ActionFunctionArgs {
    admin: AdminApiContextWithoutRest
}
export class GraphqlAuth {
    private KEY = "app_auth"

    onGetData = async ({ admin, settings = {} }: onGetDataProps) => {
        const respond = await admin.graphql(`
            query {
                currentAppInstallation {
                    id
                    metafields(first: 10, namespace: "${this.KEY}") {
                        edges {
                            node {
                                key
                                value
                            }
                        }
                    }
                }
            }
        `);

        const result = await respond.json();
        const metafields = result?.data?.currentAppInstallation?.metafields?.edges || [];
        metafields.forEach((edge: any) => {
            settings[edge.node.key] = edge.node.value;
        });

        return settings;
    };

    onSaveData = async ({ admin, request }: onSaveDataProps) => {
        const form = await request.formData();
        try {
            const active = form.get("active");
            const user = form.get("user");
            const password = form.get("password");

            if (!user) {
                throw new Error("El usuario es requerido");
            }
            // 1. Obtener el ID de instalación de la app
            const respond = await admin.graphql(`
                query {
                    currentAppInstallation { id }
                }
            `);
            const result = await respond.json();
            const data = result?.data;

            const installId = data.currentAppInstallation.id;

            // 2. Guardar los metafields (usuario y contraseña)

            await admin.graphql(
                `mutation setAppData($metafields: [MetafieldsSetInput!]!) {
                    metafieldsSet(metafields: $metafields) {
                        metafields { id namespace key value }
                        userErrors { field message }
                    }
                }`,
                {
                    variables: {
                        metafields: [
                            {
                                ownerId: installId,
                                namespace: this.KEY,
                                key: "active",
                                value: active ? "true" : "false",
                                type: "boolean",
                            },
                            {
                                ownerId: installId,
                                namespace: this.KEY,
                                key: "user",
                                value: user,
                                type: "single_line_text_field",
                            },
                            {
                                ownerId: installId,
                                namespace: this.KEY,
                                key: "password",
                                value: password,
                                type: "single_line_text_field",
                            },
                        ],
                    },
                }
            );
            return json({ success: true , message: "Configuración guardada con éxito" });
        } catch (error: Error | any) {
            return json({ success :false, message: error?.message }, { status: 500 });

        };
    };
    loader = async ({ request }: LoaderFunctionArgs) => {
        const { admin } = await authenticate.admin(request);

        const settings: Record<string, string> = {
            ...(await this.onGetData({ admin, settings: {} }))
        };

        return settings;
    };
    action = async ({ request, ...props }: ActionFunctionArgs) => {
        const { admin } = await authenticate.admin(request);
        return await this.onSaveData({ admin, request, ...props });
    };

}





