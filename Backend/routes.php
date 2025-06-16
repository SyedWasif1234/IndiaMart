<?php

function loadRoutes($router) {
    $router->get('/', [new HomeController(), 'index']);
}