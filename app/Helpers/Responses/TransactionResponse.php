<?php

namespace App\Helpers\Responses;

use App\Enums\Transactions\ResponseType;
use App\Helpers\Log;
use \Exception;

class TransactionResponse
{
  /**
   * Creates a response object with a code, message, data, and optional logging.
   *
   * @param ResponseType $code Response type (INFO, OK, WARNING, ERROR).
   * @param string $message Description of the response.
   * @param array|\Exception|null $data Optional data or exception.
   * @param bool $loggin Whether to log the response (default: false).
   *
   * @return object Response object with code, message, data, and logging flag.
   */
  private static function RESPONSE(ResponseType $code, string $message, array|\Exception|null $data = [], bool $loggin = false)
  {
    if ($loggin) Log::error($message, $data);
    if (is_array($data)) $data = array_diff_key($data, array_flip(['file', 'line', 'function']));
    return (object)[
      'code' => $code,
      'message' => $message,
      'data' => (object)$data,
      'loggin' => $loggin,
    ];
  }

  /**
   * Generates an INFO response.
   *
   * @param string $message Response message.
   * @param array $data Optional response data.
   *
   * @return object Response object with INFO code.
   */
  public static function INFO(string $message, array $data = [])
  {
    return self::RESPONSE(ResponseType::INFO, $message, $data, false);
  }

  /**
   * Generates an OK response.
   *
   * @param string $message Response message.
   * @param array $data Optional response data.
   *
   * @return object Response object with OK code.
   */
  public static function OK(string $message, array $data = [])
  {
    return self::RESPONSE(ResponseType::OK, $message, $data, false);
  }

  /**
   * Generates a WARNING response with optional caller details.
   *
   * @param string $message Response message.
   * @param array $data Optional response data.
   * @param bool $loggin Whether to log the response (default: false).
   *
   * @return object Response object with WARNING code.
   */
  public static function WARNING(string $message, array $data = [], bool $loggin = false)
  {
    if (empty($data) || $loggin) {
      $backtrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 2);
      $caller = $backtrace[1];
      $data = array_merge([
        'file' => $caller['class'] . ".php" ?? 'unknown file',
        'line' => $caller['line'] ?? 'unknown line',
        'function' => $caller['function'] ?? 'unknown function',
      ], $data);
    }
    return self::RESPONSE(ResponseType::WARNING, $message, $data, $loggin);
  }

  /**
   * Generates an ERROR response with optional exception or caller details.
   *
   * @param string $message Error message.
   * @param array|Exception $exception Exception or additional details.
   * @param bool $loggin Whether to log the response (default: true).
   *
   * @return object Response object with ERROR code.
   */
  public static function ERROR(string $message, array|Exception $exception, bool $loggin = true)
  {
    if (empty($exception)) {
      $backtrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 2);
      $caller = $backtrace[1];
      $exception = [
        'file' => $caller['class'] . ".php" ?? 'unknown file',
        'line' => $caller['line'] ?? 'unknown line',
        'function' => $caller['function'] ?? 'unknown function',
      ];
    }
    return self::RESPONSE(ResponseType::ERROR, $message, $exception, $loggin);
  }
}
