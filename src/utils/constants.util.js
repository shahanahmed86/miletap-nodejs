const SIZE_LIMIT = 10 * 1024 * 1024;

const NUMBER_OF_PROXY = 1;

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const PHONE_REGEX = /((\+|00)\d{1,3}[ -])?\(?(\d{3})\)?[ -]?\(?(\d{3})\)?[ -]?\(?(\d{4})\)?/;

module.exports = {
  SIZE_LIMIT,
  NUMBER_OF_PROXY,
  PASSWORD_REGEX,
  PHONE_REGEX,
}