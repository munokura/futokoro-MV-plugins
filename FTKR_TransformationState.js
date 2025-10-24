//=============================================================================
// ステートが掛かっている間キャラ画像を変えるプラグイン
// FTKR_TransformationState.js
// プラグインNo : 33
// 作成者     : フトコロ
// 作成日     : 2017/05/02
// 最終更新日 : 2017/10/08
// バージョン : v1.1.0
//=============================================================================

var Imported = Imported || {};
Imported.FTKR_TFS = true;

var FTKR = FTKR || {};
FTKR.TFS = FTKR.TFS || {};

//=============================================================================
/*:
@plugindesc v1.1.0 A plugin that changes the character image while the state is active
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
By implementing this plugin, you can change the actor's SV character image while the state is active.

Enter the following tag in the state's Note field:

<TFS_TRANSFORM:filename>

Changes the actor's SV character image to filename.png.
Save the image file in img/sv_actors.

You can also specify the filename with "%1" appended to it, where "%1" is the ID (4 digits) of the actor to which the state is active.

Example: If a character with actor ID 1 is in a state tagged with <TFS_Transform:Transform_%1>

The image to be loaded will be Transform_0001.png.
(ID1 is converted to 0001 (four-digit display).)

If you don't want the weapon to be swung during transformation, enter the following tag in the state:

<TFS_WEAPON_LESS>

-----------------------------------------------------------------------------
Setup Instructions
-----------------------------------------------------------------------------
1. Add this plugin to the "Plugin Manager."

---------------------------------------------------------------------------
License for this Plugin
---------------------------------------------------------------------------
This plugin is released under the MIT License.

Copyright (c) 2017 Futokoro
http://opensource.org/licenses/mit-license.php

---------------------------------------------------------------------------
Change History
-----------------------------------------------------------------------------

v1.0.2 - 2017/08/02: Bug fixes
1. Added a process to avoid conflicts with other plugins.

v1.0.1 - May 3, 2017: Help section added
v1.0.0 - May 2, 2017: First version created

-----------------------------------------------------------------------------
*/

/*:ja
@plugindesc v1.1.0 ステートが掛かっている間キャラ画像を変えるプラグイン
@author Futokoro
@url https://github.com/munokura/futokoro-MV-plugins
@license MIT License

@help
-----------------------------------------------------------------------------
概要
-----------------------------------------------------------------------------
本プラグインを実装することで、ステートが掛かっている間アクターの
SVキャラ画像を変更することができます。

以下のタグをステートのメモ欄に記入してください。

<TFS_変身:filename>
<TFS_TRANSFORM:filename>

アクターのSVキャラ画像を filename.png に変えます。
画像ファイルは、img/sv_actors内に保存してください。

なお、ファイル名に filename%1と "%1"と付けて指定すると
%1の部分がステートが掛かっているアクターのID(4桁表示)に
変換された画像ファイルを読み込むことが出来ます。

例) アクターID1のキャラに<TFS_変身:変身_%1>のタグが付いたステートが
    掛かっている場合

    読み込む画像は、 変身_0001.png になります。
    （ID1 を 4桁表示の 0001 に変換しています）


変身中に武器を振らせたくない場合は、以下のタグをステートに記入してください。

<TFS_武器非表示>
<TFS_WEAPON_LESS>


-----------------------------------------------------------------------------
設定方法
-----------------------------------------------------------------------------
1.「プラグインマネージャー(プラグイン管理)」に、本プラグインを追加して
   ください。


-----------------------------------------------------------------------------
本プラグインのライセンスについて(License)
-----------------------------------------------------------------------------
本プラグインはMITライセンスのもとで公開しています。
This plugin is released under the MIT License.

Copyright (c) 2017 Futokoro
http://opensource.org/licenses/mit-license.php


-----------------------------------------------------------------------------
変更来歴
-----------------------------------------------------------------------------

v1.0.2 - 2017/08/02 : 不具合修正
   1. 他プラグインとの競合回避処理を追加。

v1.0.1 - 2017/05/03 : ヘルプ追記
v1.0.0 - 2017/05/02 : 初版作成

-----------------------------------------------------------------------------
*/

//=============================================================================

(function () {

    //=============================================================================
    // プラグイン パラメータ
    //=============================================================================
    var parameters = PluginManager.parameters('FTKR_TransformationState');

    //objのメモ欄に <metacode> があれば真を返す
    var hasObjectMeta = function (obj, metacodes) {
        if (!obj) return false;
        return metacodes.some(function (metacode) {
            var metaReg = new RegExp('<' + metacode + '>', 'i');
            return metaReg.test(obj.note);
        });
    };

    //objのメモ欄から <metacode: x> の値を読み取って返す
    var readObjectMeta = function (obj, metacodes) {
        if (!obj) return false;
        var match = {};
        metacodes.some(function (metacode) {
            var metaReg = new RegExp('<' + metacode + ':[ ]*(.+)>', 'i');
            match = metaReg.exec(obj.note);
            return match;
        });
        return match ? match[1] : '';
    };

    //=============================================================================
    // ステートのメモ欄の読み取り
    //=============================================================================

    Sprite_Actor.prototype.clearTransformData = function () {
        this._transformName = '';
        this._transformWeaponLess = false;
    };

    Sprite_Actor.prototype.checkTfState = function () {
        if (this._actor) {
            return this.readTransformData();
        }
        return null;
    };

    Sprite_Actor.prototype.readTransformData = function () {
        return this._actor.states().some(function (state) {
            this._transformName = readObjectMeta(state, ['TFS_変身', 'TFS_TRANSFORM']);
            if (this._transformName) {
                this._transformName = this._transformName.format(this._actor.actorId().padZero(4));
            }
            this._transformWeaponLess = hasObjectMeta(state, ['TFS_武器非表示', 'TFS_WEAPON_LESS']);
            return this._transformName;
        }, this);
    };

    //=============================================================================
    // アクターのSV戦闘画像を変える
    //=============================================================================

    var _TFS_Sprite_Actor_updateBitmap = Sprite_Actor.prototype.updateBitmap;
    Sprite_Actor.prototype.updateBitmap = function () {
        if (this.checkTfState() && this._transformName) {
            Sprite_Battler.prototype.updateBitmap.call(this);
            var name = this._transformName;
            if (this._battlerName !== name) {
                this._battlerName = name;
                this._mainSprite.bitmap = ImageManager.loadSvActor(name);
            }
        } else {
            this.clearTransformData();
            _TFS_Sprite_Actor_updateBitmap.call(this);
        }
    };

    //=============================================================================
    // アクターの武器画像を表示させない
    //=============================================================================

    var _TFS_Sprite_Actor_setupWeaponAnimation = Sprite_Actor.prototype.setupWeaponAnimation;
    Sprite_Actor.prototype.setupWeaponAnimation = function () {
        if (this._transformWeaponLess) {
            this._weaponSprite.setup();
        } else {
            _TFS_Sprite_Actor_setupWeaponAnimation.call(this);
        }
    };

}());//EOF