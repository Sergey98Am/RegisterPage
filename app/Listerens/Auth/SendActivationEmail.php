<?php

namespace App\Listerens\Auth;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\Auth\ActivationEmail;
use App\Mail\Email;
use Redirect, Response, DB, Config;
use Mail;

class SendActivationEmail
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  ActivationEmail  $event
     * @return void
     */
    public function handle(ActivationEmail $event)
    {
       if($event->user->active){
            return;
       }

        Mail::to($event->user->email)->send(new Email($event->user));
    }
}
