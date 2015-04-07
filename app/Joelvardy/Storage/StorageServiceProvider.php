<?php

namespace Joelvardy\Storage;

use Illuminate\Support\ServiceProvider;

class StorageServiceProvider extends ServiceProvider {

    public function register() {
        $this->app->bind('Joelvardy\Storage\UserRepository', 'Joelvardy\Storage\EloquentUserRepository');
    }

}
