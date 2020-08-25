<?php

namespace app\controllers;

use app\models\SignUpForm;
use app\models\User;
use Yii;
use yii\filters\AccessControl;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\Cors;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;
use yii\web\UnauthorizedHttpException;

class SiteController extends Controller
{
    public $enableCsrfValidation = false;

    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'corsFilter'  => [
                'class' => Cors::class,
                'cors'  => [
                    'Origin'                           => ['http://localhost:4200'],
                    'Access-Control-Request-Method'    => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                    'Access-Control-Request-Headers' => ['*'],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::class,
                'actions' => [
                    'login' => ['POST'],
                    'register' => ['POST'],
                ],
            ],
        ];
    }

    public function actionLogin()
    {
        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post(), '') && $model->login()) {
            return $model->user->toArray(['id', 'user_name', 'access_token']);
        }

        throw new UnauthorizedHttpException('Invalid credentials');
    }

    public function actionRegister()
    {
        $model = new SignUpForm();
        if ($model->load(Yii::$app->request->post(), '') && $model->validate() && $model->register()) {
            return $model->user->toArray(['id', 'user_name', 'access_token']);
        }
        
        throw new UnauthorizedHttpException('User name is already taken.');
    }
}
