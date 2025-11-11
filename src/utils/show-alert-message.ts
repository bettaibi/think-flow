import { toast} from "sonner"

export function showAlertMessage(message: string, severity: "success" | "error" | "warning" | "info" = "success"){
    toast[severity](message);
}