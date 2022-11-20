export default function format(num) {
  let formatted = num.toString();
  const digits = formatted.split('');

  console.log(formatted);
  console.log(digits);

  for (let i = 0; i < digits.length; i += 1) {
    console.log(i);
  }

  formatted = digits.join('');
  return formatted;
}

// add comma at [length - 3], [(length - 3) * 2]
console.log(format(9412));
