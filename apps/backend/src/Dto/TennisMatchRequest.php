<?php

namespace App\Dto;

class TennisMatchRequest
{
    public function __construct(
        public string $player1,
        public string $player2,
        public array  $points
    )
    {
    }
}