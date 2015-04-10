<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;

class Note extends Eloquent {

    protected $fillable = ['user_id', 'text'];

}
