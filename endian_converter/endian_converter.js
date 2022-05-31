let BigInteger = require('big-integer');
function parseIntFromHex(hex_ascii_number)
{
    if (hex_ascii_number === 48) return 0;
    else if (hex_ascii_number > 48 && hex_ascii_number <= 57)
        return hex_ascii_number - 48;
    else if (hex_ascii_number >= 97 && hex_ascii_number <= 102)
        return hex_ascii_number - 87;
    return -1;
}
function toLittleEndianFromHex(hex_number)
{
    let hex_value = hex_number.slice(2).toLowerCase(),
        number_length = hex_value.length,
        dec_number = BigInteger(0),
        digit = BigInteger(0);
    for (let i = 0; i < number_length; i+=2)
    {
        digit = BigInteger(parseIntFromHex(hex_value.charCodeAt(i)));
        digit = digit.multiply(BigInteger(16).pow(i+1));
        dec_number = dec_number.add(digit);
        digit = BigInteger(parseIntFromHex(hex_value.charCodeAt(i+1)));
        digit = digit.multiply(BigInteger(16).pow(i));
        dec_number = dec_number.add(digit);
    }
    return dec_number.toString(10);
}
function toBigEndianFromHex(hex_number)
{
    let hex_value = hex_number.slice(2).toLowerCase(),
        number_length = hex_value.length,
        dec_number = BigInteger(0),
        digit = BigInteger(0);
    for (let i = number_length - 1; i >= 0; i--)
    {
        digit = BigInteger(parseIntFromHex(hex_value.charCodeAt(i)));
        digit = digit.multiply(BigInteger(16).pow(number_length - i - 1));
        dec_number = dec_number.add(digit);
    }
    return dec_number.toString(10);
}
function toHexFromLittleEndian(dec_number, number_of_bytes)
{
    let number_length = number_of_bytes * 2,
        hex_value = toHexFromBigEndian(dec_number),
        count_of_zero_digits = number_length - hex_value.length;
    for (let i = 0; i < count_of_zero_digits; i++)
        hex_value += '0';
    return hex_value;
}
function toHexFromBigEndian(dec_number)
{
    return '0x' + BigInteger(dec_number).toString(16);
}