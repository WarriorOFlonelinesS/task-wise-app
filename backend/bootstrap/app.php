<?php

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (\Throwable $e, Request $request) {
            if ($request->is('api/*')) {
                $statusCode = match (true) {
                    $e instanceof AuthenticationException => 401,
                    $e instanceof \Illuminate\Database\Eloquent\ModelNotFoundException,
                    $e instanceof \Symfony\Component\Http\Exception\NotFoundHttpException => 404,
                    $e instanceof \Illuminate\Validation\ValidationException => 422,
                    default => 500,
                };

                $response = match (true) {
                    $e instanceof AuthenticationException => ['message' => 'Unauthenticated.'],
                    $e instanceof \Illuminate\Validation\ValidationException => [
                        'message' => $e->getMessage(),
                        'errors' => $e->errors(),
                    ],
                    default => ['message' => $e->getMessage()]
                };

                if (config('app.debug')) {
                    $response['exception'] = get_class($e);
                    $response['trace'] = $e->getTrace();
                }

                return response()->json($response, $statusCode);
            }
        });
    })->create();
