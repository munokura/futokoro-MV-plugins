//=============================================================================
// フロントビューモードでアクター側にアニメーションを表示するプラグイン
// FTKR_FVActorAnimation.js
// プラグインNo : 56
// 作成者     : フトコロ
// 作成日     : 2017/11/12
// 最終更新日 : 2020/02/10
// バージョン : v1.1.2
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_FAA = true;

var FTKR = FTKR || {};
FTKR.FAA = FTKR.FAA || {};

//=============================================================================
/*:
@plugindesc v1.1.2 A plugin that displays animations on the actor side in front view mode
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
English Help Translator: munokura
This is an unofficial English translation of the plugin help,
created to support global RPG Maker users.
Feedback is welcome to improve translation quality
(see: https://github.com/munokura/futokoro-MV-plugins ).
Original plugin by Futokoro.
Please check the URL below for the latest version of the plugin.
URL https://github.com/futokoro/RPGMaker
-----
-----------------------------------------------------------------------------
Overview
-----------------------------------------------------------------------------
By implementing this plugin, you can display animations and damage popups on the actor's side in front view mode.

You can also apply a color-changing effect to the actor's image while selecting an action.

This plugin cannot be used in combination with FTKR_FacialImageDifference.js.

-----------------------------------------------------------------------------
Setup Instructions
----------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager."

2. To display the animation, you must display a facial image or a custom image (*1) in the actor's status window on the battle screen.

(*1) FTKR_CustomSimpleActorStatus.js is required.

Use a separate plugin to display the image in the window.

However, this Traits may not be available with all plugins.

You can also use FTKR_CustomSimpleActorStatus.js and FTKR_CSS_BattleStatus.js to display a face image or a custom image in the status window.

3. When using this plugin in combination with FTKR_CustomSimpleActorStatus.js, add this plugin so that it is listed at the bottom in the Plugin Manager.

-----------------------------------------------------------------------------
About Selected Actor Effects
-----------------------------------------------------------------------------
You can apply the following effects to the actor image during action selection by configuring the plugin parameters.

1. Color Tone Settings

When enabled, the color tone will alternate between the specified color tone and the default color tone [red: 0, green: 0, blue: 0, gray: 0].
Depending on the pattern value, you can create a gradual change in multiple stages.

Example: If the plugin parameters are set as follows:
color = red:100, green:100, blue:100, gray:0 (the image will turn white)
parttrn = 10

Since the difference from the default color tone is 100, when divided into 10 steps, the color tone will change in increments of 10, as shown below.

[0,0,0,0] ⇒ [10,10,10,0] ⇒ [20,20,20,0] ⇒ ...
... ⇒ [90,90,90,0] ⇒ [100,100,100,0] ⇒ [90,90,90,0] ⇒ ...

The count value controls the duration of each change.
The larger the value, the longer it takes for each color tone to change.

2. Cursor Settings

This is the default display for the MV, where an area corresponding to one actor will be dimly illuminated.
You can disable this effect by hiding it.

-----------------------------------------------------------------------------
Plugin Notes
-----------------------------------------------------------------------------
1. Animation Settings
If the animation blending method is set to "Additive," the status window and animation may overlap, causing some discoloration of the window.

To avoid this issue, change the animation blending method to "Normal" or hide the status window background.

2. Use in Side View Mode
When using this plugin in side view mode, animations and damage popups will not be displayed on the actor's SV character.
This plugin should only be used in front view mode.

3. Partial Changes to the Battle Screen Layer Structure
The layer structure will be changed as follows.

Battle Background < Enemy Animation < Status Window <
< Ally Animation < Battle Log < ...

(Previous Layer Configuration)
Battle Background < Enemy Animation < Battle Log <
< Status Window < Ally Animation < ...

-----------------------------------------------------------------------------
License for this Plugin
-----------------------------------------------------------------------------
This plugin is released under the MIT License.

Copyright (c) 2017,2018 Futokoro
http://opensource.org/licenses/mit-license.php

Plugin Publisher
https://github.com/futokoro/RPGMaker/blob/master/README.md

-----------------------------------------------------------------------------
Change History
-----------------------------------------------------------------------------

v1.1.2 - 2020/02/10: Bug Fixes
1. Adjusted the display position of animations that affect the entire party.

v1.1.1 - August 25, 2018: Bug fixes and refactoring
1. Fixed an issue where animations for ally targets were not displayed.

v1.1.0 - December 25, 2017: Specification changes
1. Changed the layer structure of battle scenes.

v1.0.9 - December 16, 2017: Bug fixes
1. Supports FTKR_FacialImageDifference2.js.

v1.0.8 - December 16, 2017: Bug fixes
1. Fixed a timing discrepancy between the opening and closing of the status window and the display/hide of facial images.

v1.0.7 - December 15, 2017: Bug fixes
1. Fixed an issue where the plugin was affecting facial images outside of Battle.

v1.0.6 - 2017/12/02: Bug Fixes
1. Fixed a bug where the previous actor's image would remain when changing the actor on the status screen.

v1.0.5 - 2017/11/24: Bug Fixes
1. Fixed an issue where rearranging a party of 5 or more people would cause the player to display incorrectly.

v1.0.4 - 2017/11/14: Bug Fixes
1. Fixed an issue where color settings would not load correctly.
2. Adjusted the display position of face images.

v1.0.3 - 2017/11/14: Bug Fixes, Help Fixes
1. Fixed an issue where an error would occur after selecting an action on the battle screen.

v1.0.2 - 2017/11/13: Bug Fixes
1. Fixed an issue where custom image IDs would not be Reflectioned.

v1.0.1 - November 13, 2017: Bug fixes, Traits additions, and help section revisions.
1. Fixed an issue where face images were not displayed correctly.
2. Fixed an error that occurred when custom images had no cropping settings.
3. Fixed an issue where the image position was shifted when a custom image was scaled.
4. Added a Traits to enable or disable the cursor display for the selected actor.
5. Added a Traits to change the tone of the selected actor's image.

v1.0.0 - November 12, 2017: First version created.

-----------------------------------------------------------------------------

@param --アニメーション--
@text --animation--

@param アニメーションの表示先
@text Animation destination
@desc Select whether to display the animation on a face image or a custom image (*1). (*1) FTKR_CustomSimpleActorStatus.js is required.
@default 1
@type select
@option Do not display
@value 0
@option Facial image
@value 1
@option Custom Images
@value 2

@param 味方全体対象のX座標ずれ
@text X coordinate shift for all allies
@desc X coordinate shift of animation display position for all allies
@default 0

@param 味方全体対象のY座標ずれ
@text Y coordinate shift for all allies
@desc Y coordinate shift of animation display position for all allies
@default 0

@param --ダメージポップアップ--
@text --Damage popup--

@param ポップアップ表示
@text Pop-up display
@desc Choose whether to display the damage popup.
@default 1
@type select
@option Show
@value 1
@option Do not display
@value 0

@param X座標のずれ
@text X coordinate deviation
@desc X coordinate offset of damage popup position relative to image
@default -32

@param Y座標のずれ
@text Y coordinate deviation
@desc Y coordinate offset of damage popup position relative to image
@default 0

@param 画面揺れ効果
@text Screen shaking effect
@desc Set whether or not to use the screen shake effect when taking damage.
@default 1
@type select
@option Shake
@value 1
@option Don't shake
@value 0

@param --選択中のアクターエフェクト--
@text --Selected Actor Effect--
@desc This setting is only valid on the battle screen.

@param 色調設定
@text tone settings
@desc Alternates the color tone of the selected actor image from the default to the color tone you set. See Help for details.
@default {"enable":"0","color":"0,0,0,0","pattern":"6","count":"10"}
@type struct<tone>

@param カーソル設定
@text Cursor Settings
@desc Sets the cursor display for the selected actor.
@default 1
@type select
@option Cursor displayed
@value 1
@option No cursor displayed
@value 0
*/


/*~struct~tone:
@param enable
@desc Set whether to enable color tone settings.
@default 0
@type select
@option Enable
@value 1
@option Disable
@value 0

@param color
@desc Color tone setting. Set in the order "red, green, blue, gray" separated by commas.
@default 0,0,0,0

@param pattern
@desc Set how many steps the color tone should change to.
@default 6
@type number
@min 1

@param count
@desc Sets the interval between gradations of color tone.
@default 10
@type number
@min 1
*/


/*:ja
@plugindesc v1.1.2 フロントビューモードでアクター側にアニメーションを表示するプラグイン
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
本プラグインを実装することで、フロントビューモードで
アクター側にもアニメーションやダメージポップアップを表示します。

また、行動選択中のアクターの画像に対して、色調を変化させるエフェクトを
発生させることができます。


このプラグインは、FTKR_FacialImageDifference.jsと
組み合わせて使用できません。


-----------------------------------------------------------------------------
設定方法
-----------------------------------------------------------------------------
1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
   ください。


2. アニメーションを表示させるためには、バトル画面のアクターの
   ステータスウィンドウに、顔画像かカスタム画像(*1)を表示する
   必要があります。

   (*1) FTKR_CustomSimpleActorStatus.jsが必要。

   別途プラグインを用いて、画像をウィンドウに表示させてください。
   ただし、すべてのプラグインで本機能が必ず使用できるわけではありません。

   なお、FTKR_CustomSimpleActorStatus.jsとFTKR_CSS_BattleStatus.jsを
   使って、ステータスウィンドウに顔画像またはカスタム画像を表示させることが
   できます。


3. FTKR_CustomSimpleActorStatus.jsと組み合わせて使用する場合は
   「プラグインマネージャー(プラグイン管理)」で、本プラグインが
   下になるように追加してください。


-----------------------------------------------------------------------------
選択中のアクターエフェクトについて
-----------------------------------------------------------------------------
行動選択中のアクターの画像に対して、プラグインパラメータの設定で
以下のエフェクトを発生させることができます。

1. 色調設定

有効にすると、設定した色調とデフォルトの色調[赤:0,緑:0,青:0,グレー:0]を
交互に変化させることができます。

pattern の値により、変化を複数の段階に分けて徐々に変化させることができます。

例) プラグインパラメータの設定を以下にした場合
   color = 赤:100,緑:100,青:100,グレー:0 (画像が白くなる)
   parttrn = 10

デフォルトの色調との差が 100 あるため、10段階に分けると下のように
10ずつ色調が変化します。

[0,0,0,0] ⇒ [10,10,10,0] ⇒ [20,20,20,0] ⇒ ...
 ... ⇒ [90,90,90,0] ⇒ [100,100,100,0] ⇒ [90,90,90,0] ⇒ ...


count の値により、変化ごとの表示時間を設定することができます。
数値が大きいほど、色調が１段階変わる時間が長くなります。


2. カーソル設定

これはMVのデフォルトの表示で、アクター１人分のエリアが薄く光る状態に
なることです。
表示なしにすることで、この効果を無効にできます。


-----------------------------------------------------------------------------
プラグインの注意点
-----------------------------------------------------------------------------
1. アニメーションの設定について
   アニメーションの設定で合成方法が「加算」の場合、ステータスウィンドウと
   アニメーションが重なって、ウィンドウの色が一部変色したりする場合があります。

   この現象を回避するためには、アニメーションの合成方法を「通常」などに変えるか
   ステータスウィンドウの背景を非表示にしてください。


2. サイドビューモードでの使用
   このプラグインをサイドビューモードで使用すると、アクターのSVキャラに
   アニメーションやダメージポップアップが表示しなくなります。
   このプラグインは、フロントビューモードでのみ使用してください。


3. 戦闘画面のレイヤー構成の一部変更について
   以下のようにレイヤー構成を変更します。

   戦闘画面背景＜敵対象のアニメーション＜ステータスウィンドウ＜
       ＜味方対象のアニメーション＜戦闘ログ＜...

   (従来のレイヤー構成)
   戦闘画面背景＜敵対象のアニメーション＜戦闘ログ＜
       ＜ステータスウィンドウ＜味方対象のアニメーション＜...


-----------------------------------------------------------------------------
本プラグインのライセンスについて(License)
-----------------------------------------------------------------------------
本プラグインはMITライセンスのもとで公開しています。
This plugin is released under the MIT License.

Copyright (c) 2017,2018 Futokoro
http://opensource.org/licenses/mit-license.php


プラグイン公開元
https://github.com/futokoro/RPGMaker/blob/master/README.md


-----------------------------------------------------------------------------
変更来歴
-----------------------------------------------------------------------------

v1.1.2 - 2020/02/10 : 不具合修正
   1. パーティー全体を対象とするアニメーションの表示位置調整。

v1.1.1 - 2018/08/25 : 不具合修正、リファクタリング
   1. 味方対象のアニメーションが表示されない不具合を修正。

v1.1.0 - 2017/12/25 : 仕様変更
   1. バトルシーンのレイヤー構成を変更。

v1.0.9 - 2017/12/16 : 不具合修正
   1. FTKR_FacialImageDifference2.jsに対応。

v1.0.8 - 2017/12/16 : 不具合修正
   1. ステータスウィンドウの開閉と顔画像の表示非表示のタイミングのズレを修正。

v1.0.7 - 2017/12/15 : 不具合修正
   1. 戦闘中以外の顔画像に対してもプラグインの影響が出ていた不具合を修正。

v1.0.6 - 2017/12/02 : 不具合修正
   1. ステータス画面でアクターを変えた場合に、変更前のアクターの画像が残る
      不具合を修正。

v1.0.5 - 2017/11/24 : 不具合修正
   1. 5人パーティー以上で並べ替えを実施すると、正しく表示できない不具合を修正。

v1.0.4 - 2017/11/14 : 不具合修正
   1. 色調設定が正常に読み込まれない不具合を修正。
   2. 顔画像の表示位置を調整。

v1.0.3 - 2017/11/14 : 不具合修正、ヘルプ修正
   1. バトル画面で行動選択後にエラーになる不具合を修正。

v1.0.2 - 2017/11/13 : 不具合修正
   1. カスタム画像のID指定が反映されない不具合を修正。

v1.0.1 - 2017/11/13 : 不具合修正、機能追加、ヘルプ修正
   1. 顔画像が正しく表示されない不具合を修正。
   2. カスタム画像のトリミング設定がない場合にエラーになる不具合を修正。
   3. カスタム画像にスケールを設定したときに、画像の表示位置が
      ずれる不具合を修正。
   4. 選択中のアクターのカーソル表示の有無を設定する機能を追加。
   5. 選択中のアクターの画像のトーンを変化させる機能を追加。

v1.0.0 - 2017/11/12 : 初版作成

-----------------------------------------------------------------------------

@param --アニメーション--
@text --アニメーション--

@param アニメーションの表示先
@text アニメーションの表示先
@desc アニメーションの表示先を、顔画像かカスタム画像(*1)のどちらかを選択します。(*1)FTKR_CustomSimpleActorStatus.jsが必要
@default 1
@type select
@option 表示しない
@value 0
@option 顔画像
@value 1
@option カスタム画像
@value 2

@param 味方全体対象のX座標ずれ
@text 味方全体対象のX座標ずれ
@desc 味方全体対象のアニメーション表示位置のX座標のずれ
@default 0

@param 味方全体対象のY座標ずれ
@text 味方全体対象のY座標ずれ
@desc 味方全体対象のアニメーション表示位置のY座標のずれ
@default 0

@param --ダメージポップアップ--
@text --ダメージポップアップ--

@param ポップアップ表示
@text ポップアップ表示
@desc ダメージポップアップを表示するか選択します
@default 1
@type select
@option 表示する
@value 1
@option 表示しない
@value 0

@param X座標のずれ
@text X座標のずれ
@desc 画像に対するダメージポップアップ位置のX座標のずれ
@default -32

@param Y座標のずれ
@text Y座標のずれ
@desc 画像に対するダメージポップアップ位置のY座標のずれ
@default 0

@param 画面揺れ効果
@text 画面揺れ効果
@desc ダメージ時の画面揺れ効果の有無を設定します。
@default 1
@type select
@option 揺らす
@value 1
@option 揺らさない
@value 0

@param --選択中のアクターエフェクト--
@text --選択中のアクターエフェクト--
@desc この設定はバトル画面のみ有効です。

@param 色調設定
@text 色調設定
@desc 選択中のアクター画像の色調をデフォルトから設定した色調に交互に変化させます。詳細はヘルプ参照。
@default {"enable":"0","color":"0,0,0,0","pattern":"6","count":"10"}
@type struct<tone>

@param カーソル設定
@text カーソル設定
@desc 選択中のアクターのカーソル表示を設定します。
@default 1
@type select
@option カーソル表示あり
@value 1
@option カーソル表示なし
@value 0
*/


/*~struct~tone:ja
@param enable
@desc 色調設定を有効にするか設定します。
@default 0
@type select
@option 有効にする
@value 1
@option 無効にする
@value 0

@param color
@desc 色調の設定。「赤,緑,青,グレー」の順にカンマで区切って設定してください。
@default 0,0,0,0

@param pattern
@desc 設定した色調に何段階で変化させるか設定します。
@default 6
@type number
@min 1

@param count
@desc 色調の段階変化の間隔を設定します。
@default 10
@type number
@min 1
*/

//=============================================================================

function Sprite_ActorFace() {
    this.initialize.apply(this, arguments);
}

function Sprite_ActorImage() {
    this.initialize.apply(this, arguments);
}

function Sprite_FaceAnimation() {
    this.initialize.apply(this, arguments);
}

function Window_BattleSpriteStatus() {
    this.initialize.apply(this, arguments);
}

(function () {

    //配列の要素を、すべて数値に変換する。
    Array.prototype.num = function () {
        return this.map(function (elm) {
            return Number(elm);
        });
    }

    var paramParse = function (obj) {
        return JSON.parse(JSON.stringify(obj, paramReplace));
    };

    var paramReplace = function (key, value) {
        try {
            return JSON.parse(value || null);
        } catch (e) {
            return value;
        }
    };

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_FVActorAnimation');

    FTKR.FAA = {
        destination: Number(parameters['アニメーションの表示先'] || 0),
        animation: {
            offsetX: Number(parameters['味方全体対象のX座標ずれ'] || 0),
            offsetY: Number(parameters['味方全体対象のY座標ずれ'] || 0),
        },
        damage: {
            enable: Number(parameters['ポップアップ表示'] || 0),
            offsetX: Number(parameters['X座標のずれ'] || 0),
            offsetY: Number(parameters['Y座標のずれ'] || 0),
            shake: Number(parameters['画面揺れ効果'] || 0),
        },
        select: {
            tone: paramParse(parameters['色調設定']) || {},
            cursor: Number(parameters['カーソル設定'] || 0),
        },
    };

    //=============================================================================
    // アクター側のアニメーション表示用レイヤーを追加
    //=============================================================================
    //カーソルとステータスの間に追加
    var _FAA_Window_createAllParts = Window.prototype._createAllParts;
    Window.prototype._createAllParts = function () {
        _FAA_Window_createAllParts.call(this);
        this._createWindowCssSprite();
    };

    Window.prototype._createWindowCssSprite = function () {
        this._windowCssSprite = new Sprite();
        var index = 0;
        this.children.some(function (child, i) {
            if (child == this._windowCursorSprite) {
                index = i + 1;
                return true;
            }
        }, this);
        if (index) {
            this.addChildAt(this._windowCssSprite, index);
        } else {
            this.addChild(this._windowCssSprite);
        }
    };

    //=============================================================================
    // フロントビューモードでも、アクター側にダメージエフェクトが発生するように修正
    //=============================================================================

    //書き換え
    Game_Actor.prototype.performDamage = function () {
        Game_Battler.prototype.performDamage.call(this);
        this.requestMotion('damage');
        if (FTKR.FAA.damage.shake) $gameScreen.startShake(5, 5, 10);
        SoundManager.playActorDamage();
    };

    //=============================================================================
    // アクターの顔画像表示処理をスプライト方式に修正
    //=============================================================================

    var _FAA_Window_Base_initialize = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function (x, y, width, height) {
        _FAA_Window_Base_initialize.call(this, x, y, width, height);
        this._faceSprite = [];
    };

    Window_Base.prototype.showActorNum = function () {
        return this.maxPageItems ? this.maxPageItems() : 1;
    };

    var _FAA_Window_Base_clearCssSprite = Window_Base.prototype.clearCssSprite;
    Window_Base.prototype.clearCssSprite = function (index) {
        _FAA_Window_Base_clearCssSprite.call(this, index);
        if (this._faceSprite[index]) this._faceSprite[index].setBattler();
    };

    Window_Base.prototype.clearFaceSprites = function () {
        this._faceSprite.forEach(function (sprite) {
            sprite.setBattler();
        });
    };

    Window_Base.prototype.isFaceSpriteBusy = function () {
        return this._faceSprite.some(function (sprite) {
            return sprite.isAnimationPlaying();
        });
    };

    Window_Base.prototype.showFaceSprites = function () {
        this._faceSprite.forEach(function (sprite) {
            sprite.show();
        });
    };

    Window_Base.prototype.hideFaceSprites = function () {
        this._faceSprite.forEach(function (sprite) {
            sprite.hide();
        });
    };

    //=============================================================================
    // BattleManager
    // バトルマネージャー
    //=============================================================================

    //ステータスウィンドウにアニメーションを表示している間、次の処理に移らないようにする
    var _FAA_BattleManager_isBusy = BattleManager.isBusy;
    BattleManager.isBusy = function () {
        return (_FAA_BattleManager_isBusy.call(this) || this._statusWindow.isBusy());
    };

    //=============================================================================
    // バトル終了後に、逃走フラグを削除
    //=============================================================================

    var _FAA_Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
        _FAA_Scene_Map_start.call(this);
        BattleManager._escaped = false;
    };

    //=============================================================================
    // バトルシーンのレイヤー構成を変更
    //=============================================================================
    //書き換え
    Scene_Battle.prototype.createStatusWindow = function () {
    };

    Scene_Battle.prototype.createFaaStatusWindow = function () {
        this._statusWindow = new Window_BattleSpriteStatus();
        this.addChild(this._statusWindow);
    };

    var _FAA_Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
    Scene_Battle.prototype.createSpriteset = function () {
        _FAA_Scene_Battle_createSpriteset.call(this);
        this.createFaaStatusWindow();
    };

    var _FAA_Scene_Battle_updateWindowPositions = Scene_Battle.prototype.updateWindowPositions;
    Scene_Battle.prototype.updateWindowPositions = function () {
        if (this._actorWindow.visible || this._enemyWindow.visible || $gameMessage.isBusy()) {
            this._statusWindow.hide();
        } else {
            this._statusWindow.show();
        }
        _FAA_Scene_Battle_updateWindowPositions.call(this);
    };

    //=============================================================================
    // Sprite_ActorFace
    // アクターの顔画像表示スプライトクラスを定義
    //=============================================================================

    Sprite_ActorFace.prototype = Object.create(Sprite_Actor.prototype);
    Sprite_ActorFace.prototype.constructor = Sprite_ActorFace;

    Sprite_ActorFace.prototype.initialize = function (battler, window) {
        Sprite_Battler.prototype.initialize.call(this, battler);
        this._spriteWindow = window;
    };

    Sprite_ActorFace._imageWidth = 144;
    Sprite_ActorFace._imageHeight = 144;

    Sprite_ActorFace.prototype.initMembers = function () {
        Sprite_Battler.prototype.initMembers.call(this);
        this._battlerName = '';
        this._tone = [0, 0, 0, 0];
        this._toneCount = 0;
        this._tonePattern = 0;
        this._code = 1;
        this._requestUpdateTone = false;
        this.createMainSprite();
    };

    Sprite_ActorFace.prototype.setBattler = function (battler) {
        Sprite_Battler.prototype.setBattler.call(this, battler);
        var changed = (battler !== this._actor);
        if (changed) {
            this._actor = battler;
        }
    };

    Sprite_ActorFace.prototype.setScale = function (scale) {
        this.scale._x = scale;
        this.scale._y = scale;
    };

    Sprite_ActorFace.prototype.startToneChange = function () {
        this._requestUpdateTone = true;
    };

    Sprite_ActorFace.prototype.stopToneChange = function () {
        this._requestUpdateTone = false;
        if (this._mainSprite) this._mainSprite.setColorTone([0, 0, 0, 0]);
    };

    Sprite_ActorFace.prototype.update = function () {
        Sprite_Base.prototype.update.call(this);
        if (this._actor) {
            this.updateMain();
            this.updateTone();
            if (FTKR.FAA.destination > 0) this.updateAnimation();
            if (FTKR.FAA.damage.enable) this.updateDamagePopup();
            this.updateSelectionEffect();
        } else {
            this.bitmap = null;
        }
    };

    Sprite_ActorFace.prototype.updateMain = function () {
        this.updateBitmap();
        this.updateFrame();
    };

    Sprite_ActorFace.prototype.updateTone = function () {
        var toneSet = FTKR.FAA.select.tone;
        if (!toneSet.enable || !this._mainSprite || !this._requestUpdateTone) return;
        var tone = toneSet.color.split(',').num();
        if (this._toneCount >= toneSet.count) {
            var pattern = toneSet.pattern;
            if (this._tonePattern == pattern) {
                this._code *= -1;
                this._tonePattern = 0;
            }
            this._tone = [
                this._tone[0] + this._code * tone[0] / pattern,
                this._tone[1] + this._code * tone[1] / pattern,
                this._tone[2] + this._code * tone[2] / pattern,
                this._tone[3] + this._code * tone[3] / pattern
            ];
            this._tonePattern += 1;
            this._mainSprite.setColorTone(this._tone);
            this._toneCount = 0;
        } else {
            this._toneCount += 1;
        }
    };

    Sprite_ActorFace.prototype.updateBitmap = function () {
        Sprite_Battler.prototype.updateBitmap.call(this);
        var name = this._actor.faceName();
        if (this._battlerName !== name) {
            this._battlerName = name;
            this._mainSprite.bitmap = ImageManager.loadFace(name);
        }
    };

    Sprite_ActorFace.prototype.updateFrame = function () {
        Sprite_Battler.prototype.updateFrame.call(this);
        var bitmap = this._mainSprite.bitmap;
        if (bitmap) {
            var cw = Sprite_ActorFace._imageWidth;
            var ch = Sprite_ActorFace._imageHeight;
            var motionIndex = this._actor.faceIndex();
            var cx = motionIndex % 4;
            var cy = Math.floor(motionIndex / 4);
            this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch);
        }
    };

    Sprite_ActorFace.prototype.updateVisibility = function () {
        Sprite_Base.prototype.updateVisibility.call(this);
        if (!this._actor) {
            this.visible = false;
        }
    };

    Sprite_Actor.prototype.setupAnimation = function () {
    };

    Sprite_ActorFace.prototype.setupAnimation = function () {
        while (this._actor.isAnimationRequested()) {
            var data = this._actor.shiftAnimation();
            var animation = $dataAnimations[data.animationId];
            var mirror = data.mirror;
            var delay = animation.position === 3 ? 0 : data.delay;
            this.startAnimation(animation, mirror, delay);
        }
    };

    Sprite_ActorFace.prototype.startAnimation = function (animation, mirror, delay) {
        var sprite = new Sprite_FaceAnimation(this._spriteWindow);
        sprite.setup(this._effectTarget, animation, mirror, delay);
        if (this.scale._y !== 1) sprite.setHeight(Sprite_ActorFace._imageHeight * this.scale._y);
        this.parent.addChild(sprite);
        this._animationSprites.push(sprite);
    };

    Sprite_Actor.prototype.setupDamagePopup = function () {
    };

    Sprite_ActorFace.prototype.setupDamagePopup = function () {
        if (this._actor.isDamagePopupRequested()) {
            var sprite = new Sprite_Damage();
            sprite.x = this.x + this.damageOffsetX();
            sprite.y = this.y + this.damageOffsetY();
            sprite.setup(this._actor);
            this._damages.push(sprite);
            this.parent.addChild(sprite);
            this._actor.clearDamagePopup();
            this._actor.clearResult();
        }
    };

    Sprite_ActorFace.prototype.damageOffsetX = function () {
        return FTKR.FAA.damage.offsetX;
    };

    Sprite_ActorFace.prototype.damageOffsetY = function () {
        return FTKR.FAA.damage.offsetY;
    };

    //=============================================================================
    // Sprite_ActorImage
    // アクターのカスタム画像表示スプライトクラスの定義
    //=============================================================================

    Sprite_ActorImage.prototype = Object.create(Sprite_ActorFace.prototype);
    Sprite_ActorImage.prototype.constructor = Sprite_ActorImage;

    Sprite_ActorImage.prototype.updateBitmap = function () {
        Sprite_Battler.prototype.updateBitmap.call(this);
        var id = this._imageId || 0;
        var name = this._actor.actor().cssbgi[id].name;
        if (this._battlerName !== name) {
            this._battlerName = name;
            this._mainSprite.bitmap = ImageManager.loadPicture(name);
        }
    };

    Sprite_ActorImage.prototype.setImageId = function (id) {
        this._imageId = id;
    };

    Sprite_ActorImage.prototype.updateFrame = function () {
        Sprite_Battler.prototype.updateFrame.call(this);
        var bitmap = this._mainSprite.bitmap;
        if (bitmap) {
            var id = this._imageId || 0;
            var bgi = this._actor.actor().cssbgi[id];
            var sw = bgi.width || bitmap.width;
            var sh = bgi.height || bitmap.height;
            var sx = bgi.offsetX || 0;
            var sy = bgi.offsetY || 0;
            this._mainSprite.setFrame(sx, sy, sw, sh);
        }
    };

    //=============================================================================
    // Sprite_FaceAnimation
    // アクターの顔画像用アニメーション表示スプライトクラスを定義
    //=============================================================================

    Sprite_FaceAnimation.prototype = Object.create(Sprite_Animation.prototype);
    Sprite_FaceAnimation.prototype.constructor = Sprite_FaceAnimation;

    Sprite_FaceAnimation._checker1 = {};
    Sprite_FaceAnimation._checker2 = {};

    Sprite_FaceAnimation.prototype.initialize = function (window) {
        Sprite_Animation.prototype.initialize.call(this);
        this._spriteWindow = window;
        this._spriteHeight = 144;
    };

    Sprite_FaceAnimation.prototype.setHeight = function (height) {
        this._spriteHeight = height;
    };

    Sprite_FaceAnimation.prototype.updatePosition = function () {
        if (this._animation.position === 3) {
            this.x = this._spriteWindow.width / 2 + FTKR.FAA.animation.offsetX;
            this.y = this._spriteWindow.height / 2 + FTKR.FAA.animation.offsetY;
        } else {
            var parent = this._target.parent;
            var grandparent = parent ? parent.parent : null;
            this.x = this._target.x;
            this.y = this._target.y;
            if (this.parent === grandparent) {
                this.x += parent.x;
                this.y += parent.y;
            }
            if (this._animation.position === 0) {
                this.y -= this._spriteHeight;
            } else if (this._animation.position === 1) {
                this.y -= this._spriteHeight / 2;
            }
        }
    };

    //=============================================================================
    // Window_BattleSpriteStatus
    // バトル画面のステータス表示用ウィンドウクラス
    //=============================================================================

    Window_BattleSpriteStatus.prototype = Object.create(Window_BattleStatus.prototype);
    Window_BattleSpriteStatus.prototype.constructor = Window_BattleSpriteStatus;

    Window_BattleSpriteStatus.prototype.isBusy = function () {
        return this.isFaceSpriteBusy();
    };

    //アクター選択中のエフェクト表示を追加
    Window_BattleSpriteStatus.prototype.select = function (index) {
        Window_BattleStatus.prototype.select.call(this, index);
        this.setActorImageEffect(index);
    };

    Window_BattleSpriteStatus.prototype.setActorImageEffect = function (index) {
        if (!FTKR.FAA.select.cursor) {
            this.setCursorRect(0, 0, 0, 0);
        }
        if (FTKR.FAA.select.tone.enable) {
            this._faceSprite.forEach(function (sprite, i) {
                i === index ? sprite.startToneChange() : sprite.stopToneChange();
            });
        }
    };

    Window_BattleSpriteStatus.prototype.updateOpen = function () {
        if (this._opening) {
            this.openness += 32;
            if (this.isOpen()) {
                this._opening = false;
                this.showFaceSprites();
            }
        }
    };

    Window_BattleSpriteStatus.prototype.updateClose = function () {
        if (this._closing) {
            this.hideFaceSprites();
        }
        Window_BattleStatus.prototype.updateClose.call(this);
    };

    Window_BattleSpriteStatus.prototype.drawActorFace = function (actor, x, y, width, height) {
        if (!$gameParty.inBattle() || FTKR.FAA.destination !== 1) {
            return Window_BattleStatus.prototype.drawActorFace.call(this, actor, x, y, width, height);
        } else {
            width = width || Window_Base._faceWidth;
            height = height || Window_Base._faceHeight;
            this.drawCssFace(actor, x, y, width, height);
        }
    };

    //書き換え
    Window_BattleSpriteStatus.prototype.drawCssFace = function (actor, dx, dy, width, height) {
        if (!$gameParty.inBattle() || FTKR.FAA.destination !== 1) {
            return Window_BattleStatus.prototype.drawCssFace.call(this, actor, dx, dy, width, height);
        } else {
            var index = actor.index() % this.showActorNum();
            var sprite = this._faceSprite[index];
            var fh = Window_Base._faceHeight;
            var fsize = Math.min(height, fh);
            var scale = Imported.FTKR_CSS ? fsize / fh : 1;
            if (!sprite) {
                sprite = new Sprite_ActorFace(actor, this);
                this._windowCssSprite.addChild(sprite);
                this._faceSprite[index] = sprite;
            } else if (sprite._actor !== actor) {
                sprite.setBattler(actor);
            }
            dx = dx + fsize * scale / 2 + this.padding;
            if (Imported.FTKR_CSS) {
                dx += FTKR.CSS.cssStatus.face.posiX * (width - fsize * scale) / 2;
            }
            var sx = Math.floor(dx);
            var sy = dy + fsize + this.padding;
            sprite.setHome(sx, sy);
            sprite.startEntryMotion();
            sprite.setScale(scale);
        }
    };

    //書き換え
    Window_BattleSpriteStatus.prototype.drawCssImage = function (actor, dx, dy, width, id) {
        if (!$gameParty.inBattle() || FTKR.FAA.destination !== 2) {
            return Window_BattleStatus.prototype.drawCssImage.call(this, actor, dx, dy, width, id);
        } else {
            var bgi = actor.actor().cssbgi[id];
            var bitmap = ImageManager.loadPicture(bgi.name);
            if (!bitmap) return 1;
            var index = actor.index() % this.showActorNum();
            var sprite = this._faceSprite[index];
            var fw = bgi.width || bitmap.width;
            var fh = bgi.height || bitmap.height;
            var scale = bgi.scale / 100;
            var dh = fh * scale;
            var dw = fw * scale;
            if (!sprite) {
                sprite = new Sprite_ActorImage(actor, this);
                this._windowCssSprite.addChild(sprite);
                this._faceSprite[index] = sprite;
            } else if (sprite._actor !== actor) {
                sprite.setBattler(actor);
            }
            dx = dx + dw / 2 + this.padding;
            dx += FTKR.CSS.cssStatus.image.posiX * (width - dw) / 2;
            var sx = dx;
            var sy = dy + dh + this.padding;
            sprite.setImageId(id);
            sprite.setHome(sx, sy);
            sprite.startEntryMotion();
            sprite.setScale(scale);
            return Math.ceil(dh / this.lineHeight()) || 1;
        }
    };


}());//EOF