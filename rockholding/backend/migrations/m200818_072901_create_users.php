<?php

use yii\db\Migration;

/**
 * Class m200818_072901_create_users
 */
class m200818_072901_create_users extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('users', [
            'id' => $this->primaryKey()->notNull(),
            'user_name' => $this->string()->notNull()->unique(),
            'password' => $this->string()->notNull(),
            'access_token' => $this->string(512)->unique(),
        ]);

        $this->createIndex('idx_user_name', 'users', 'user_name');
        $this->createIndex('idx_password', 'users', 'password');
        $this->createIndex('idx_access_token', 'users', 'access_token');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('users');
    }
}
