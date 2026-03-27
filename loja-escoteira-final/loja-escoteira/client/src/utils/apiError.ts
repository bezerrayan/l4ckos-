import { TRPCClientError } from "@trpc/client";

export type ApiErrorDisplay = {
  code: string;
  message: string;
  details: string[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map(item => String(item ?? "").trim()).filter(Boolean);
}

export function getApiErrorDisplay(error: unknown, fallbackMessage = "Não foi possível concluir a operação."): ApiErrorDisplay {
  if (error instanceof TRPCClientError) {
    const data = isRecord(error.data) ? error.data : {};
    const appError = isRecord(data.appError) ? data.appError : {};
    const zodError = isRecord(data.zodError) ? data.zodError : {};
    const fieldErrors = isRecord(zodError.fieldErrors) ? Object.values(zodError.fieldErrors).flatMap(readStringArray) : [];
    const formErrors = readStringArray(zodError.formErrors);
    const details = readStringArray(appError.details);
    const mergedDetails = [...details, ...fieldErrors, ...formErrors].filter((item, index, list) => list.indexOf(item) === index);
    const message = typeof appError.message === "string" && appError.message.trim()
      ? appError.message.trim()
      : typeof error.message === "string" && error.message.trim()
        ? error.message.trim()
        : fallbackMessage;

    return {
      code: typeof appError.code === "string" && appError.code.trim() ? appError.code : "UNKNOWN_ERROR",
      message,
      details: mergedDetails,
    };
  }

  if (error instanceof Error) {
    return {
      code: "UNKNOWN_ERROR",
      message: error.message?.trim() || fallbackMessage,
      details: [],
    };
  }

  return {
    code: "UNKNOWN_ERROR",
    message: fallbackMessage,
    details: [],
  };
}
