import { IsDefined, IsNonNull } from './TypeChecks';

export function SetConditionalValue(
  property: any,
  value_if_property_is_set: any,
  value_if_property_is_not_set: any
) {
  if (IsNonNull(property) && IsDefined(property)) {
    return value_if_property_is_set;
  } else {
    return value_if_property_is_not_set;
  }
}
