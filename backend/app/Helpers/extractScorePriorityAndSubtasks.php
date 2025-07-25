<?php

function extractScorePriorityAndSubtasks($text) {
    $priority = null;
    $smart_score = null;
    $subtasks = [];

    if (preg_match('/\*\*Priority(?: Level)?:\s*([A-Za-z]+)\*\*/i', $text, $matches)) {
        $priority = $matches[1];
    } elseif (preg_match('/Priority(?: Level)?:\s*([A-Za-z]+)/i', $text, $matches)) {
        $priority = $matches[1];
    }

    $validPriorities = ['high', 'medium', 'low'];
    if ($priority && !in_array(strtolower($priority), $validPriorities)) {
        $priority = null;
    }

    if (preg_match('/\*\*Smart Score:\*\*\s*([\d\.]+)/i', $text, $matches)) {
        $smart_score = $matches[1];
    } elseif (preg_match('/Smart Score:\s*([\d\.]+)/i', $text, $matches)) {
        $smart_score = $matches[1];
    } elseif (preg_match('/Total Smart Score:\s*([\d\.]+)/i', $text, $matches)) {
        $smart_score = $matches[1];
    } elseif (preg_match('/Total Smart Score:\s*([\d\.]+)\/100/i', $text, $matches)) {
        $smart_score = $matches[1];
    }

    if ($smart_score !== null) {
        $smart_score = round(floatval($smart_score));
    }

    if(preg_match('/Subtasks:\s*((?:\d+\.\s.*\n?)+)/i', $text, $matches)){
        $subtasksBlock = $matches[1];

        if(preg_match_all('/\d+\.\s*(.+)/', $subtasksBlock, $subtasksMatches)){
            $subtasks = $subtasksMatches[1];
        }
    }

    return [
        'subtasks' => $subtasks,
        'priority' => $priority,
        'smart_score' => $smart_score
    ];
}