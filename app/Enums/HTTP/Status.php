<?php

namespace App\Enums\HTTP;

enum Status: int
{
    // 1xx: Informational
  case HTTP100 = 100;
  case HTTP101 = 101;
  case HTTP102 = 102;
  case HTTP103 = 103;

    // 2xx: Success
  case HTTP200 = 200;
  case HTTP201 = 201;
  case HTTP202 = 202;
  case HTTP203 = 203;
  case HTTP204 = 204;
  case HTTP205 = 205;
  case HTTP206 = 206;

    // 3xx: Redirection
  case HTTP300 = 300;
  case HTTP301 = 301;
  case HTTP302 = 302;
  case HTTP304 = 304;
  case HTTP307 = 307;
  case HTTP308 = 308;

    // 4xx: Client Errors
  case HTTP400 = 400;
  case HTTP401 = 401;
  case HTTP403 = 403;
  case HTTP404 = 404;
  case HTTP405 = 405;
  case HTTP408 = 408;
  case HTTP429 = 429;

    // 5xx: Server Errors
  case HTTP500 = 500;
  case HTTP501 = 501;
  case HTTP502 = 502;
  case HTTP503 = 503;
  case HTTP504 = 504;

  /**
   * Get the message for each HTTP response code.
   *
   * @return string
   */
  public function getMessage(): string
  {
    return match ($this) {
      // 1xx: Informational
      self::HTTP100 => 'Continue',
      self::HTTP101 => 'Switching Protocols',
      self::HTTP102 => 'Processing',
      self::HTTP103 => 'Early Hints',

      // 2xx: Success
      self::HTTP200 => 'OK',
      self::HTTP201 => 'Created',
      self::HTTP202 => 'Accepted',
      self::HTTP203 => 'Non-Authoritative Information',
      self::HTTP204 => 'No Content',
      self::HTTP205 => 'Reset Content',
      self::HTTP206 => 'Partial Content',

      // 3xx: Redirection
      self::HTTP300 => 'Multiple Choices',
      self::HTTP301 => 'Moved Permanently',
      self::HTTP302 => 'Found',
      self::HTTP304 => 'Not Modified',
      self::HTTP307 => 'Temporary Redirect',
      self::HTTP308 => 'Permanent Redirect',

      // 4xx: Client Errors
      self::HTTP400 => 'Bad Request',
      self::HTTP401 => 'Unauthorized',
      self::HTTP403 => 'Forbidden',
      self::HTTP404 => 'Not Found',
      self::HTTP405 => 'Method Not Allowed',
      self::HTTP408 => 'Request Timeout',
      self::HTTP429 => 'Too Many Requests',

      // 5xx: Server Errors
      self::HTTP500 => 'Internal Server Error',
      self::HTTP501 => 'Not Implemented',
      self::HTTP502 => 'Bad Gateway',
      self::HTTP503 => 'Service Unavailable',
      self::HTTP504 => 'Gateway Timeout',
    };
  }
}
