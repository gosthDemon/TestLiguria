<?php

namespace App\Enums\Transactions;

enum ResponseType: int
{
    case INFO = 1;
    case OK = 2;
    case WARNING = 3;
    case ERROR = 4;

    public function logLevel(): string
    {
        return match ($this) {
            self::INFO => 'info',
            self::OK => 'info',
            self::WARNING => 'warning',
            self::ERROR => 'error',
        };
    }
}
