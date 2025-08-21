import { BlockStack } from "@shopify/polaris";
import { Box, Button, ErrorComponent, InputPassword, InputSwich, InputText, Title, useData } from "fenextjs";
import { useFormAuth, useFormAuthProps } from "./hook";
import { useFetcher } from "@remix-run/react";

export interface FormAuthProps extends useFormAuthProps { }

export const FormAuth = ({ ...props }: FormAuthProps) => {
    const fetcher = useFetcher();
    //   const onSave = async (data: IFormAuth) => {
    //     shopify.toast.show("Configuracion Guardada");
    //   }

    const {
        data,
        onChangeData,
        validatorData,
        onSubmitData,
        loaderSubmit,
        dataError,
        isValidData,
    } = useFormAuth({ ...props });

    return <>

        <fetcher.Form method="post" >
            <BlockStack gap="200">
                <Box>
                    <label
                        style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: ".5rem",
                            cursor: "pointer",
                        }}
                    >
                        <InputSwich name="active" onChange={onChangeData("active")} defaultValue={data.active} />
                        <Title tag="h3">Activar</Title>
                    </label>
                </Box>
                <Box>
                    <BlockStack gap="200">
                        <Title tag="h3">Usuario</Title>
                        <InputText
                            name="user"
                            label="Usuario"
                            placeholder="Usuario"
                            defaultValue={data.user}
                            validator={validatorData?.user}
                            onChange={onChangeData("user")}
                        />
                        <InputPassword
                            name="password"
                            label="Contraseña"
                            placeholder="Contraseña"
                            defaultValue={data.password}
                            validator={validatorData?.password}
                            onChange={onChangeData("password")}
                        />
                        {dataError && <ErrorComponent error={dataError?.error} />}

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                            }}
                        >
                            <input type="hidden" name="_action" value="saveConfig" />
                            <Button
                                loader={fetcher.state == "submitting"}
                            >
                                Guardar configuración
                            </Button>
                        </div>
                        {/* Loader durante el submit */}
                        {fetcher.state === "submitting" && <p>Enviando...</p>}

                        {/* Mensajes después de la respuesta */}
                        {fetcher.data?.success && (
                            <p style={{ color: "green" }}>✅ Guardado con éxito</p>
                        )}
                        {fetcher.data?.success === false && (
                            <p style={{ color: "red" }}>❌ {fetcher.data.message}</p>
                        )}
                        {JSON.stringify(fetcher.formData, null, 2) }
                    </BlockStack>
                </Box>
            </BlockStack>
        </fetcher.Form>
    </>;
}