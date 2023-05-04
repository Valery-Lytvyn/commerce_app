import { TYPE_TOAST } from "../constants/typeToast";
import { notification } from "./utils";

export const firebaseErrorMessage = errorMessage => notification(errorMessage.slice(10), TYPE_TOAST.ERROR)