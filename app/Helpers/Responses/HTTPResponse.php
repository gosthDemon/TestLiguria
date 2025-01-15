<?php

namespace App\Helpers\Responses;

use App\Enums\HTTP\Response;
use App\Helpers\Log;
use \Exception;

class HTTPResponse
{

  /**
   * Creates a JSON response for any HTTP status code.
   *
   * @param Response $code The HTTP response code (e.g., 200, 400, 500).
   * @param string $message A message describing the response.
   * @param array|\Exception|null $data The response data (on success) or exception (on error).
   * @param bool $isJsonResponse Determines if the response should be returned as JSON (default: true).
   *
   * @return \Illuminate\Http\JsonResponse|\stdClass The response as a JSON object or plain object.
   */
  private static function RESPONSE(Response $code, string $message, array|\Exception|null $data = [], bool $isJsonResponse = true)
  {
    $status = $code->value ?? Response::HTTP500;
    $phrase = $code->getMessage();
    $success = $code->value >= 100 && $code->value < 300;
    $timestamp = now()->toDateTimeString();

    $responseData = [
      "status" => $status,
      "phrase" => $phrase,
      "success" => $success,
      "message" => $message,
      "timestamp" => $timestamp,
    ];

    if ($success) {
      $responseData['data'] = $data;
    } else {
      if ($data instanceof \Exception) {
        $responseData['errors'] = $data instanceof \Illuminate\Validation\ValidationException ? $data->errors() : $data->getMessage();
        if (config('app.debug')) {
          $responseData['errors']['debug'] = [
            'message' => $data->getMessage(),
            'file' => $data->getFile(),
            'line' => $data->getLine(),
          ];
        }
      } else {
        $responseData['errors'] = $data;
      }
    }

    return $isJsonResponse ? response()->json($responseData) : (object) $responseData;
  }
  /**
   * Responds with HTTP status codes in the 1xx range.
   *
   * The description below applies to all the following methods:
   * Each method represents a specific HTTP status code within the 1xx informational category.
   * These responses indicate that the request has been received and is still being processed.
   *
   * @param string $message A descriptive message for the response.
   * @param array|null $data Optional data to include in the response.
   * @param bool $isJsonResponse Determines whether the response is returned as JSON or an object.
   * @return \Illuminate\Http\JsonResponse|object
   */

  public static function Response100(string $message, array|null $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP100, $message, $data, $isJsonResponse);
  }
  public static function Response101(string $message, array|null $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP101, $message, $data, $isJsonResponse);
  }
  public static function Response102(string $message, array|null $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP102, $message, $data, $isJsonResponse);
  }

  public static function Response103(string $message, array|null $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP103, $message, $data, $isJsonResponse);
  }

  /**
   * Responds with an HTTP status code and optional data.
   *
   * The description of this method applies to all the 2xx status codes below.
   * Each method corresponds to a specific HTTP status code.
   * These responses indicate that the request has been received and successfully processed.
   *
   * @param string $message A descriptive message for the response.
   * @param array|null $data Optional data to include in the response.
   * @param bool $isJsonResponse Determines whether the response is returned as JSON or an object.
   * @return \Illuminate\Http\JsonResponse|object
   */

  public static function Response200(string $message, array|null $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP200, $message, $data, $isJsonResponse);
  }

  public static function Response201(string $message, array|null $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP201, $message, $data, $isJsonResponse);
  }

  public static function Response202(string $message, array|null $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP202, $message, $data, $isJsonResponse);
  }

  public static function Response203(string $message, array|null $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP203, $message, $data, $isJsonResponse);
  }

  public static function Response204(string $message, array|null $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP204, $message, $data, $isJsonResponse);
  }

  public static function Response205(string $message, array|null $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP205, $message, $data, $isJsonResponse);
  }

  public static function Response206(string $message, array|null $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP206, $message, $data, $isJsonResponse);
  }

  /**
   * Responds with HTTP status codes in the 3xx redirection range.
   *
   * Each method corresponds to a specific HTTP 3xx status code, indicating that the client must take additional action
   * (e.g., follow a redirect). Some codes may require specific fields in the `$data` parameter, such as URLs for redirection.
   *
   * @param string $message A descriptive message for the response.
   * @param array|null $data Optional or mandatory data depending on the status code.
   * @param bool $isJsonResponse Determines whether the response is returned as JSON or an object.
   * @return \Illuminate\Http\JsonResponse|object
   */
  public static function Response300(string $message, array|null $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP300, $message, $data, $isJsonResponse);
  }

  public static function Response301(string $message, array $data, bool $isJsonResponse = true)
  {
    $data['new_url'] = $data['new_url'] ?? '';
    return self::RESPONSE(Response::HTTP301, $message, $data, $isJsonResponse);
  }

  public static function Response302(string $message, array $data, bool $isJsonResponse = true)
  {
    $data['temporary_url'] = $data['temporary_url'] ?? '';
    return self::RESPONSE(Response::HTTP302, $message, $data, $isJsonResponse);
  }

  public static function Response304(string $message, bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP304, $message, null, $isJsonResponse);
  }

  public static function Response307(string $message, array $data, bool $isJsonResponse = true)
  {
    $data['redirect_url'] = $data['redirect_url'] ?? '';
    return self::RESPONSE(Response::HTTP307, $message, $data, $isJsonResponse);
  }

  public static function Response308(string $message, array $data, bool $isJsonResponse = true)
  {
    $data['permanent_url'] = $data['permanent_url'] ?? '';
    return self::RESPONSE(Response::HTTP308, $message, $data, $isJsonResponse);
  }

  /**
   * Responds with an HTTP 400 status code indicating a bad request.
   *
   * The description of this method applies to all the 4xx status codes below.
   * These responses indicate that the server could not understand the request
   * due to malformed syntax or invalid data.
   *
   * @param string $message A descriptive message explaining the error.
   * @param array|null $data Optional data or error details to include in the response.
   * @param bool $isJsonResponse Determines whether the response is returned as JSON or an object.
   * @return \Illuminate\Http\JsonResponse|object
   */

  /**
   * Bad Request, some fields have incorrect format.
   */
  public static function Response400(string $message, array|\Exception $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP400, $message, $data, $isJsonResponse);
  }
  /**
   * Unauthorized, user is not authenticated.
   */
  public static function Response401(string $message, array|\Exception $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP401, $message, $data, $isJsonResponse);
  }
  /**
   * Forbidden, user does not have permission to access the resource.
   */
  public static function Response403(string $message, array|\Exception $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP403, $message, $data, $isJsonResponse);
  }
  /**
   * Not Found, the requested resource could not be found.
   */
  public static function Response404(string $message, array|\Exception $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP404, $message, $data, $isJsonResponse);
  }
  /**
   * Method Not Allowed, the HTTP method used is not supported for the resource.
   */
  public static function Response405(string $message, array|\Exception $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP405, $message, $data, $isJsonResponse);
  }
  /**
   * Request Timeout, the server timed out waiting for the request.
   */
  public static function Response408(string $message, array|\Exception $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP408, $message, $data, $isJsonResponse);
  }
  /**
   * Too Many Requests, the user has sent too many requests in a given period.
   */
  public static function Response429(string $message, array|\Exception $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP429, $message, $data, $isJsonResponse);
  }
  /**
   * Responds with an HTTP 500 status code indicating a server error.
   *
   * The description of this method applies to all the 5xx status codes below.
   * These responses indicate that the server encountered an error or is incapable of performing the request.
   *
   * @param string $message A descriptive message explaining the error.
   * @param array|\Exception|null $data Optional data or exception details to include in the response.
   * @param bool $isJsonResponse Determines whether the response is returned as JSON or an object.
   * @return \Illuminate\Http\JsonResponse|object
   */
  /**
   * Internal Server Error, the server encountered an unexpected condition.
   */
  public static function Response500(string $message, array|\Exception $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP500, $message, $data, $isJsonResponse);
  }
  /**
   * Not Implemented, the server does not support the functionality required to fulfill the request.
   */
  public static function Response501(string $message, array|\Exception $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP501, $message, $data, $isJsonResponse);
  }
  /**
   * Bad Gateway, the server received an invalid response from an upstream server.
   */
  public static function Response502(string $message, array|\Exception $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP502, $message, $data, $isJsonResponse);
  }
  /**
   * Service Unavailable, the server is temporarily unable to handle the request.
   */
  public static function Response503(string $message, array|\Exception $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP503, $message, $data, $isJsonResponse);
  }
  /**
   * Gateway Timeout, the server did not receive a timely response from the upstream server.
   */
  public static function Response504(string $message, array|\Exception $data = [], bool $isJsonResponse = true)
  {
    return self::RESPONSE(Response::HTTP504, $message, $data, $isJsonResponse);
  }
}
