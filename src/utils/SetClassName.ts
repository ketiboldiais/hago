import { IsUndefined } from "./Types/TypeChecks";

export function SetClassName(
  userInputClass: string | undefined,
  defaultClass: string
) {
	if (IsUndefined(userInputClass)) {
		return defaultClass;
	} else {
		return `${defaultClass} ${userInputClass}`
	}
}
