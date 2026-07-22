<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Inertia\Inertia;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Render an exception into an HTTP response.
     *
     * Outside local/testing, HTTP error responses (404/403/500/503/...) are
     * rendered as an Inertia page instead of Laravel's raw error HTML, so
     * the user sees a normal-looking page instead of a "Whoops"/blank page.
     * An expired session (419, e.g. a stale form after being idle) sends
     * them back to the previous page instead of a dead-end error page.
     */
    public function render($request, Throwable $e)
    {
        $response = parent::render($request, $e);
        $status = $response->getStatusCode();

        if (app()->environment(['local', 'testing'])) {
            return $response;
        }

        if ($status === 419) {
            return back()->with('error', 'Your session expired. Please try again.');
        }

        if (in_array($status, [403, 404, 429, 500, 503])) {
            return Inertia::render('Error', ['status' => $status])
                ->toResponse($request)
                ->setStatusCode($status);
        }

        return $response;
    }
}
