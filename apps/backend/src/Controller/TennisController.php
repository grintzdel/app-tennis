<?php

namespace App\Controller;

use App\Service\TennisScoreCalculator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/tennis', name: 'tennis_')]
class TennisController extends AbstractController
{
    public function __construct(
        private TennisScoreCalculator $calculator
    )
    {
    }

    #[Route('/calculate-score', name: 'calculate_score', methods: ['POST', 'OPTIONS'])]
    public function calculateScore(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            error_log('Données reçues: ' . print_r($data, true));

            if (!isset($data['points']) || !is_array($data['points'])) {
                throw new \Exception('Format de données invalide');
            }

            foreach ($data['points'] as &$point) {
                $point['player1'] = $data['player1'];
                $point['player2'] = $data['player2'];
            }

            $result = $this->calculator->calculateScore($data['points']);

            $response = new JsonResponse($result);
            $response->headers->set('Access-Control-Allow-Origin', '*');
            return $response;
        } catch (\Exception $e) {
            return new JsonResponse(
                ['error' => $e->getMessage()],
                500
            );
        }
    }
}