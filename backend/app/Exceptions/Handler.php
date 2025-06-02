<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;

class Handler extends ExceptionHandler
{
    public function register():void{
       $this->renderable(function(AuthenticationException $e, $request){
        if($request->expectsJson()){
            return response()->json([
                'status'=>'error',
                'message'=>'Access denied. Please authenticate.'
            ], 401);
        }
       })
    }
}
