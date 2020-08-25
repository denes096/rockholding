<?php

namespace app\models;

use Yii;
use yii\base\Model;

/**
 * LoginForm is the model behind the login form.
 *
 * @property User|null $user This property is read-only.
 *
 */
class SignUpForm extends Model
{
    public $user_name;
    public $password;
    public $user;

    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            [['user_name', 'password'], 'required'],
            ['user_name', 'unique', 'targetClass' => '\app\models\User', 'message' => 'Username is already taken']
        ];
    }

    public function register(): bool
    {
        $this->user = new User();
        $this->user->user_name = $this->user_name;
        $this->user->password = Yii::$app->security->generatePasswordHash($this->password);
        $this->user->access_token = Yii::$app->security->generateRandomString(255);

        return $this->user->save();
    }
}
