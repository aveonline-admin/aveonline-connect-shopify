import {
    IApiError,
    IApiResult,
    useData,
    useNotification,
    useRouter,
} from "fenextjs";
import { IFormAuth } from "./interface";
import { FormAuthValidator } from "./validator";

export interface useFormAuthProps {
    defaultValue?: IFormAuth;
}

export const useFormAuth = ({ defaultValue }: useFormAuthProps) => {
    const router = useRouter();
    const { pop } = useNotification({});
    const HOOK = useData<
        IFormAuth,
        any,
        IApiResult<any>,
        any,
        IApiError
    >((defaultValue ?? {}) as IFormAuth, {
        validator: FormAuthValidator,
        onSubmitData:async ()=>{
            alert("onSubmitData");
                pop({
                    message: "ok",
                    type: "WARNING",
                });
            return {
                data:{},
                message:"ok"
            }
        },
        onBeforeSubmitData: ({ isValid }) => {
            if (isValid != true) {
                pop({
                    message: isValid?.msg ?? isValid?.message ?? "",
                    type: "WARNING",
                });
            }
        },
        onAfterSubmitDataOk: ({ result }) => {
            pop({
                message: "Auth exitoso",
                type: "OK",
            });
        },
        onAfterSubmitDataError: () => {
            pop({
                message: "Auth fallido",
                type: "ERROR",
            });
        },
    });
    return {
        ...HOOK,
    };
};
