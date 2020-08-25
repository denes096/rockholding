<?php

namespace app\controllers;

use SimpleXMLElement;
use XMLReader;
use yii\filters\AccessControl;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\Cors;
use yii\filters\VerbFilter;
use yii\web\Controller;
use yii\web\NotFoundHttpException;

class EstateController extends Controller
{
    const ESTATE_URL = 'https://prod.rockhome.hu/gendocs/ingatlanok.xml';

    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'corsFilter'  => [
                'class' => Cors::class,
                'cors'  => [
                    'Origin'                           => ['*'],
                    'Access-Control-Request-Method'    => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
                    'Access-Control-Request-Headers' => ['*'],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::class,
                'actions' => [
                    'list' => ['GET'],
                    'estate-profile' => ['GET'],
                ],
            ],
            'authenticator' => [
                'class' => HttpBearerAuth::class,
                'except' => ['OPTIONS']
            ]
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    public function actionList()
    {
        $reader = new XMLReader();

        if (!$reader->open(self::ESTATE_URL)) {
            throw new NotFoundHttpException('Not found');
        }

        $estates = [];
        while ($reader->read()) {
            $data = [];
            $images = [];
            if ($reader->nodeType === XMLReader::ELEMENT && $reader->name === 'estate') {
                $estate = new \SimpleXMLElement($reader->readOuterXml());
                foreach ($estate->children() as $estateChildren) {
                    if ($estateChildren->count() === 0) {
                        $data[$estateChildren->getName()] = (string)$estateChildren;
                    }
                    else if ($estateChildren->getName() === 'images' && $estateChildren->count() > 0) {
                       foreach ($estateChildren->children() as $image) {
                           $src = $image->children();
                           $images[] = (string)$src;
                       }
                       $data['images'] = $images;
                    }
                }

                $estates[] = $data;
            }
        }
        $reader->close();

        return $estates;
    }

    public function actionEstateProfile(string $id): array
    {
        $reader = new XMLReader();

        if (!$reader->open(self::ESTATE_URL)) {
            throw new NotFoundHttpException('Not found');
        }

        $estate = [];
        while ($reader->read()) {
            $images = [];
            if ($reader->nodeType === XMLReader::ELEMENT && $reader->name === 'estate') {
                $estateNode = new SimpleXMLElement($reader->readOuterXml());
                foreach ($estateNode->children() as $estateChildren) {
                    if ($estateChildren->getName() === 'external_id' && (string)$estateChildren !== $id) {
                        break;
                    }

                    if ($estateChildren->count() === 0) {
                        $estate[$estateChildren->getName()] = (string)$estateChildren;
                    }
                    else if ($estateChildren->getName() === 'images' && $estateChildren->count() > 0) {
                        foreach ($estateChildren->children() as $image) {
                            $src = $image->children();
                            $images[] = ['image'=>(string)$src, 'thumbImage' => (string)$src];
                        }
                        $estate['images'] = $images;
                    }
                }
            }
        }
        $reader->close();

        return $estate;
    }

    /**
     * @param string|null $id
     * @return array
     * @throws NotFoundHttpException
     */
    protected static function createEstate(SimpleXMLElement $element): array
    {
        if ($element->count() === 0) {
            $data[$element->getName()] = (string)$element;
        }
        else if ($element->getName() === 'images' && $element->count() > 0) {
            foreach ($element->children() as $image) {
                $src = $image->children();
                $images[] = (string)$src;
            }
            $data['images'] = $images;
        }
    }
}