import { useEffect } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import {
  Page,
  Layout,
  // Text,
  Card,
  BlockStack,
  List,
  Link,
  InlineStack,

} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import {
  InputPassword,
  InputSwich,
  InputText,
  Title,
  Text,
  Button,
  Box,
  useData,
} from "fenextjs";
import { FormAuth } from "app/components/form/auth";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);

  return null;
};

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const { admin } = await authenticate.admin(request);
//   const color = ["Red", "Orange", "Yellow", "Green"][
//     Math.floor(Math.random() * 4)
//   ];
//   const response = await admin.graphql(
//     `#graphql
//       mutation populateProduct($product: ProductCreateInput!) {
//         productCreate(product: $product) {
//           product {
//             id
//             title
//             handle
//             status
//             variants(first: 10) {
//               edges {
//                 node {
//                   id
//                   price
//                   barcode
//                   createdAt
//                 }
//               }
//             }
//           }
//         }
//       }`,
//     {
//       variables: {
//         product: {
//           title: `${color} Snowboard`,
//         },
//       },
//     },
//   );
//   const responseJson = await response.json();

//   const product = responseJson.data!.productCreate!.product!;
//   const variantId = product.variants.edges[0]!.node!.id!;

//   const variantResponse = await admin.graphql(
//     `#graphql
//     mutation shopifyRemixTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
//       productVariantsBulkUpdate(productId: $productId, variants: $variants) {
//         productVariants {
//           id
//           price
//           barcode
//           createdAt
//         }
//       }
//     }`,
//     {
//       variables: {
//         productId: product.id,
//         variants: [{ id: variantId, price: "100.00" }],
//       },
//     },
//   );

//   const variantResponseJson = await variantResponse.json();

//   return {
//     product: responseJson!.data!.productCreate!.product,
//     variant:
//       variantResponseJson!.data!.productVariantsBulkUpdate!
//         .productVariants,
//   };
// };

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const form = await request.formData();

  if (form.get("_action") === "saveConfig") {
    const active = form.get("active");
    const user = form.get("user");
    const password = form.get("password");

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
              namespace: "app_settings",
              key: "active",
              value: active ? "true" : "false",
              type: "boolean",
            },
            {
              ownerId: installId,
              namespace: "app_settings",
              key: "user",
              value: user,
              type: "single_line_text_field",
            },
            {
              ownerId: installId,
              namespace: "app_settings",
              key: "password",
              value: password,
              type: "single_line_text_field",
            },
          ],
        },
      }
    );

    return { success: true };
  }

  return null;
};


export default function Index() {
  // const fetcher = useFetcher<typeof action>();

  // const shopify = useAppBridge();
  // const productId = fetcher.data?.product?.id.replace(
  //   "gid://shopify/Product/",
  //   "",
  // );

  // useEffect(() => {
  //   if (productId) {
  //     shopify.toast.show("Configuracion Guardada");
  //   }
  // }, [productId, shopify]);
  // const generateProduct = () => fetcher.submit({}, { method: "POST" });


  return (
    <Page>
      <TitleBar title="Aveonline Connect App">
        {/* <button variant="primary" onClick={generateProduct}>
                    Generate a product
                </button> */}
      </TitleBar>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <FormAuth />
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <BlockStack gap="500">
              <Box>
                <BlockStack gap="200">
                  <Title tag="h5">
                    Aveonline
                  </Title>
                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text tag="small">
                        Mira tu cuenta en Aveonline
                      </Text>
                      <Link
                        url="https://guias.aveonline.co/ingresar"
                        target="_blank"
                        removeUnderline
                      >
                        Ingresar
                      </Link>
                    </InlineStack>
                    {/* <InlineStack align="space-between">
                                            <Text as="span" variant="bodyMd">
                                                Database
                                            </Text>
                                            <Link
                                                url="https://www.prisma.io/"
                                                target="_blank"
                                                removeUnderline
                                            >
                                                Prisma
                                            </Link>
                                        </InlineStack>
                                        <InlineStack align="space-between">
                                            <Text as="span" variant="bodyMd">
                                                Interface
                                            </Text>
                                            <span>
                                                <Link
                                                    url="https://polaris.shopify.com"
                                                    target="_blank"
                                                    removeUnderline
                                                >
                                                    Polaris
                                                </Link>
                                                {", "}
                                                <Link
                                                    url="https://shopify.dev/docs/apps/tools/app-bridge"
                                                    target="_blank"
                                                    removeUnderline
                                                >
                                                    App Bridge
                                                </Link>
                                            </span>
                                        </InlineStack>
                                        <InlineStack align="space-between">
                                            <Text as="span" variant="bodyMd">
                                                API
                                            </Text>
                                            <Link
                                                url="https://shopify.dev/docs/api/admin-graphql"
                                                target="_blank"
                                                removeUnderline
                                            >
                                                GraphQL API
                                            </Link>
                                        </InlineStack> */}
                  </BlockStack>
                </BlockStack>
              </Box>
              {/* <Card>
                                <BlockStack gap="200">
                                    <Text as="h2" variant="headingMd">
                                        Next steps
                                    </Text>
                                    <List>
                                        <List.Item>
                                            Build an{" "}
                                            <Link
                                                url="https://shopify.dev/docs/apps/getting-started/build-app-example"
                                                target="_blank"
                                                removeUnderline
                                            >
                                                {" "}
                                                example app
                                            </Link>{" "}
                                            to get started
                                        </List.Item>
                                        <List.Item>
                                            Explore Shopify’s API with{" "}
                                            <Link
                                                url="https://shopify.dev/docs/apps/tools/graphiql-admin-api"
                                                target="_blank"
                                                removeUnderline
                                            >
                                                GraphiQL
                                            </Link>
                                        </List.Item>
                                    </List>
                                </BlockStack>
                            </Card> */}
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
