<?php

namespace App\app\Exceptions;

use Illuminate\Auth\AuthenticationException;

class Handler
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
