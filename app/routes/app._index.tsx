import {
  Page,
  Layout,
  BlockStack,
  Link,
  InlineStack,

} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import {
  Title,
  Text,
  Box,
} from "fenextjs";
import { FormAuth } from "app/components/form/auth";
import { GraphqlAuth } from "app/graphql/auth";
import { useLoaderData } from "app/hook/useLoaderData";

const Auth = new GraphqlAuth(); 

export const loader = Auth.loader

export const action = Auth.action


export default function Index() {
  const settings = useLoaderData();

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
            <FormAuth defaultValue={(settings ?? {}) as any}/>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <BlockStack gap="500">
              <Box>
                <BlockStack gap="200">
                  {/* {JSON.stringify(settings, null, 2)} */}
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
