import decimalAdjust from "game-of-forums/plugins/poll/lib/decimal-adjust";

export default function(value, exp) {
  return decimalAdjust("round", value, exp);
}
