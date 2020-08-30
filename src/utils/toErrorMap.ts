import { FieldError } from "../generated/graphql";

export const toErrorMap = (
  errorsArray: FieldError[]
): Record<string, string> => {
  const result: Record<string, string> = {};
  let temp: FieldError[] = [];
  errorsArray.forEach(({ field, message }) => {
    if (field === "usernameOrPassword")
      temp = [
        {
          field: "username",
          message: message,
        },
        {
          field: "password",
          message: message,
        },
      ];
    else temp = [{ field, message }];

    temp.forEach(({ field, message }) => {
      if (Object.keys(result).includes(field)) result[field] += `${message}.`;
      else result[field] = `${message}.`;
    });
  }, {});
  return result;
};
