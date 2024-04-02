import { Fragment } from "react";

import { arrify } from "@dvo/utils/object";

import { Flex } from "../Common/Flex";
import { Spinner } from "../Spinner/Spinner";
import { Text } from "../Text/Text";
import { H2 } from "../Typograpghy/H";

type AsyncHelperProps = {
  isError?: boolean;
  isLoading?: boolean;
  text?: string | undefined;
  errorText?: string;
  errors?: Error[];
  error?: unknown;
  marginTop?: boolean;
};

const DEFAULT_ERROR_TEXT = "Something went wrong";

const errorTypeGuard = (error: unknown): error is Error =>
  error instanceof Error;

export const AsyncHelper: React.FC<AsyncHelperProps> = ({
  isError,
  isLoading,
  text,
  errorText,
  errors,
  marginTop,
}) => {
  if (isLoading)
    return (
      <Flex>
        <Spinner />
      </Flex>
    );

  if (errors && errors.length)
    return (
      <Flex top={marginTop ? "1rem" : undefined}>
        <Text small color="dustRed_7">
          {errors[0].message}
        </Text>
      </Flex>
    );

  if (isError)
    return (
      <Flex>
        <Text small>{errorText || DEFAULT_ERROR_TEXT}</Text>
      </Flex>
    );

  if (text)
    return (
      <Flex justify="center" align="center">
        <H2 style={{ color: "grey", fontWeight: 600 }}>{text}</H2>
      </Flex>
    );

  return <Fragment />;
};

type Status = "success" | "loading" | "error" | "idle";
type StatusAsyncHelperProps = {
  status: Status | Status[];
  error: unknown | unknown[];
  marginTop?: boolean;
};

export const StatusAsyncHelper: React.FC<StatusAsyncHelperProps> = ({
  status,
  error,
  marginTop,
}) => {
  const statuses = arrify(status);
  const errors = arrify(error);

  const filteredErrors = errors?.length
    ? errors.filter(errorTypeGuard)
    : undefined;
  const foundError = filteredErrors?.length ? filteredErrors[0] : undefined;

  if (foundError)
    return (
      <Flex top={marginTop ? "1rem" : undefined}>
        <Text small color="dustRed_7">
          {foundError.message}
        </Text>
      </Flex>
    );

  const isOtherError = statuses.some((status) => status === "error");

  if (isOtherError)
    return (
      <Flex top={marginTop ? "1rem" : undefined}>
        <Text small color="dustRed_7">
          {DEFAULT_ERROR_TEXT}
        </Text>
      </Flex>
    );

  const isLoading = statuses.some((status) => status === "loading");

  if (isLoading)
    return (
      <Flex>
        <Spinner />
      </Flex>
    );

  return <Fragment />;
};
